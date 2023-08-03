# Ansible Brings Order

Q: *"How to keep a server from turning into an extremely fragile thing where you forget how you set it up and couldn't do it again if you tried?"*

A: Write shit down.

https://github.com/Aharoni-Lab/earthseed-ansible

## Inventory

- Store host-specific configuration in a structured way
- Keep secrets/keys secure while still being able to share the repo publicly by encrypting them!

`````{tab-set}
````{tab-item} inventory.yml
```yaml
all:
  hosts:
    earthseed_bootstrap:
    earthseed:
    rproxy:
```
````
````{tab-item} rproxy.yml
```yaml
ansible_host: seed.aharoni-lab.com
ansible_user: jonny
ansible_ssh_private_key_file: /Users/jonny/.ssh/id_miniscope
ansible_ipv4: "45.56.89.92"
ansible_ipv6: "2600:3c01::f03c:93ff:fe74:e4f1"

rathole_listen_port: 2333
rathole_nginx_port: 5202
rathole_ssh_port: 2222

rathole_matrix_listen_port: 2334
rathole_synapse_port: 4884
rathole_element_port: 4885

ansible_become_pass: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  30323565316330626463343663333231326138376237333536306333313064653364313138623733
  6264646339363862353666333363366535383863336465310a383061376235356134393237363033
  37316662353838626538373930633763626366393736333236306563666661656463616430363635
  6436656238386632300a303363663333666432323164313837326236383937666662643662356534
  66663361386564613835383964336162363132303039376461616337393461353336
```
````
````{tab-item} earthseed.yml
```yaml
ansible_host: seed.aharoni-lab.com
ansible_port: 2222
ansible_user: jonny
remote_user: jonny
ansible_ssh_private_key_file: /Users/jonny/.ssh/id_rsa

synapse_internal_federation_port: 8008
synapse_external_federation_port: 8448

ansible_become_pass: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  30323565316330626463343663333231326138376237333536306333313064653364313138623733
  6264646339363862353666333363366535383863336465310a383061376235356134393237363033
  37316662353838626538373930633763626366393736333236306563666661656463616430363635
  6436656238386632300a303363663333666432323164313837326236383937666662643662356534
  66663361386564613835383964336162363132303039376461616337393461353336

```
````
`````

## Playbooks

- Group common operations
- Most operations are *idempotent* - if you run them twice, you get the same thing.
- Use templates that can interpolate the values set in the inventory configurations - propagate configs from a single source of truth
- Import playbooks to reduce duplication and ensure prerequisites are met
- Coordinate action across multiple hosts

Eg. setting up the rathole reverse proxy

`````{tab-set}
````{tab-item} rproxy.yml
Top-level playbook that imports all the others!
```yaml
- hosts: rproxy
  tasks:
    - name: Install general apt packages
      become: yes
      apt:
        pkg:
          - acl

- hosts: earthseed_bootstrap
  tasks:
    - name: Put up a template homepage
      become: yes
      copy:
        src: ../templates/index.html
        dest: /var/www/html/index.html

- import_playbook: rathole/rathole-client.yml
- import_playbook: rathole/rathole-server.yml
- import_playbook: nginx/rproxy-https.yml
```
````
````{tab-item} install/rathole.yml
Installation playbook invoked before the client and server playbooks
```yaml
- import_playbook: ../common/index.yml
- import_playbook: ../provision/users/rathole.yml

- hosts: all
  become: yes
  tasks:
  - name: Create config directory
    ansible.builtin.file:
      path: "/home/rathole/configs"
      state: directory
      mode: '0755'
      owner: rathole
  - name: Create logs directory
    ansible.builtin.file:
      path: "/home/rathole/logs"
      state: directory
      mode: '0755'
      owner: rathole
  - name: Get Latest Rathole
    uri:
      url: https://api.github.com/repos/rapiz1/rathole/releases/latest
      return_content: true
    register: rathole_latest
  - name: Download Rathole
    become: yes
    become_user: root
    loop: "{{ rathole_latest.json.assets }}"
    when: 
      - "'rathole-x86_64-unknown-linux-gnu.zip' in item.name"
    unarchive:
      remote_src: yes
      src: "{{ item.browser_download_url }}"
      dest: /usr/bin
      creates: /usr/bin/rathole

```
````
````{tab-item} rathole-client.yml
Configure rathole for the client machine
```yaml
- import_playbook: ../install/rathole.yml

- hosts: earthseed_bootstrap
  user: rathole
  tasks:
    - name: Create config
      become: yes
      become_user: rathole
      template:
        src: templates/rathole-client.toml.j2
        dest: "/home/rathole/configs/client.toml"
    - name: Create systemd service
      become: yes
      template:
        src: templates/rathole-client.service.j2
        dest: /etc/systemd/system/rathole-client.service
    - name: Enable service
      become: yes
      service:
        name: rathole-client
        enabled: yes
        state: started
    - name: Restart service
      become: yes
      service:
        name: rathole-client
        state: restarted
    
```
````
````{tab-item} rathole-client.toml.j2
The rathole configuration file, populated by the variables set in our inventory
```toml
[client]
remote_addr = "{{ hostvars.rproxy.ansible_host }}:{{ hostvars.rproxy.vars.rathole_listen_port }}"

[client.transport]
type = "noise"

[client.transport.noise]
remote_public_key = "{{ hostvars.rproxy.rathole_noise_public_key }}"

[client.services.earthseed]
token = "{{ hostvars.rproxy.rathole_token }}"
local_addr = "127.0.0.1:80"

[client.services.ssh]
token = "{{ hostvars.rproxy.rathole_ssh_token }}"
local_addr = "127.0.0.1:22"

[client.services.synapse]
token = "{{ hostvars.rproxy.rathole_synapse_token }}"
local_addr = "127.0.0.1:{{ hostvars.earthseed.synapse_external_federation_port}}"

[client.services.element]
token = "{{ hostvars.rproxy.rathole_element_token }}"
local_addr = "127.0.0.1:80"

```
````
````{tab-item} rathole-client.service.j2
A systemd service to run rathole on system startup
```toml
[Unit]
Description=Rathole Client Service
After=network.target

[Service]
Type=simple
User=rathole
Restart=on-failure
RestartSec=5s
LimitNOFILE=1048576

ExecStart= /usr/bin/rathole -c /home/rathole/configs/client.toml

[Install]
WantedBy=multi-user.target
```
````
````{tab-item} rproxy-https.yml
Configure the nginx reverse proxy
```yaml
- hosts: rproxy
  become: true
  tasks:
    - name: Make nginx config for certbot
      template:
        src: templates/certbot-http.conf.j2
        dest: /etc/nginx/sites-enabled/certbot-http.conf
    - name: Reload nginx
      service:
        name: nginx
        state: restarted
    - name: Get certs
      become: true
      command: '/usr/bin/certbot certonly -n --webroot -w /var/www/letsencrypt -d {{ hostvars.rproxy.ansible_host }}'
      args:
        creates: '/etc/letsencrypt/live/{{ hostvars.rproxy.ansible_host }}'

    - name: Create nginx config
      template:
        src: templates/rproxy.conf.j2
        dest: /etc/nginx/sites-available/rproxy-earthseed.conf
    - name: Link config
      file:
        src: /etc/nginx/sites-available/rproxy-earthseed.conf
        dest: /etc/nginx/sites-enabled/rproxy-earthseed.conf
        state: link
    - name: Restart nginx
      command: systemctl restart nginx
```
````
````{tab-item} rproxy.conf.j2
The nginx configuration template!
```nginx
server {
   server_name {{ hostvars.rproxy.ansible_host }};
   location / {
      proxy_pass http://127.0.0.1:{{ hostvars.rproxy.vars.rathole_nginx_port }};
      proxy_set_header    Host            $host:80;
      proxy_set_header    X-Real-IP       $remote_addr;
      proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_hide_header   X-Powered-By;

      # For forwarding websockets
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_read_timeout 86400;
   }

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/{{ hostvars.rproxy.ansible_host }}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{{ hostvars.rproxy.ansible_host }}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}
server {
    if ($host = {{ hostvars.rproxy.ansible_host }}) {
        return 301 https://$host$request_uri;
    }

   server_name {{ hostvars.rproxy.ansible_host }};
   listen 80;
   listen [::]:80;
   return 404;
}
```
````
`````

## Roles

- Group together playbooks, variables, and templates to make reusable "roles" for more complex services

Eg. Installing Matrix (synapse/element)

```
roles/matrix
├── README.md
├── defaults
├── files
├── handlers
├── meta
├── tasks
└── templates
```

`````{tab-set}
````{tab-item} earthseed/matrix.yml
A playbook that assigns the matrix role to earthseed, also installing postgresql and creating an additional rathole configuration.

```yaml
- import_playbook: ../../rathole/rathole-client-matrix.yml

- hosts: earthseed
  collections:
    - nodiscc.xsrv
  roles:
    - nodiscc.xsrv.postgresql
    
- hosts: earthseed
  roles:
    - matrix
  
```
````
````{tab-item} defaults/main.yml
Default variables that can/should be overridden by the host using the role
```yaml
# fully qualified domain name of the matrix-synapse server instance
matrix_synapse_fqdn: matrix.CHANGEME.org
# username/password for the matrix admin user
matrix_synapse_admin_user: "CHANGEME"
matrix_synapse_admin_password: "CHANGEME25"
# postgresql database password for synapse
matrix_synapse_db_password: "CHANGEME20"
# random secret used to register new users
matrix_synapse_registration_shared_secret: "CHANGEME25"
# random secret used to sign access tokens
matrix_synapse_macaroon_secret_key: "CHANGEME25"
# yes/no: whether room invites to users on this server should be blocked (except those sent by local server admins).
matrix_synapse_block_non_admin_invites: no
# yes/no: whether to enable URL previews
matrix_synapse_enable_url_previews: yes
# start/stop the matrix-synapse service, enable/disable it on boot (yes/no) (redirect users to maintenance page if disabled)
matrix_synapse_enable_service: yes
# yes/no: aggregate (verbose) synapse logs to syslog
matrix_synapse_homeserver_logs_to_syslog: no
# HTTPS and SSL/TLS certificate mode for the matrix-synapse webserver virtualhost
#   letsencrypt: acquire a certificate from letsencrypt.org
#   selfsigned: generate a self-signed certificate
matrix_synapse_https_mode: selfsigned
# firewall zones for the matrix server, if nodiscc.xsrv.common/firewalld role is deployed
# 'zone:' is one of firewalld zones, set 'state:' to 'disabled' to remove the rule (the default is state: enabled)
matrix_firewalld_zones:
  - zone: internal
    state: enabled
  - zone: public
    state: disabled

# enable/disable the synapse-admin virtualhost (redirect users to maintenance page if disabled)
matrix_synapse_admin_enable_service: yes
# synapse-admin version (https://github.com/Awesome-Technologies/synapse-admin/releases)
matrix_synapse_admin_version: "0.8.7"

# fully qualified domain name of the element application instance
matrix_element_fqdn: "chat.CHANGEME.org"
# mode for element video rooms (jitsi/element_call)
matrix_element_video_rooms_mode: "element_call"
# when matrix_element_video_rooms_mode = 'jitsi', domain of the Jitsi instance to use for video calls
# you can set this to your own Jitsi domain if you are hosting one, but this will NOT work with Jitsi instances set up as "secure domain"/authenticated
matrix_element_jitsi_preferred_domain: "meet.element.io"
# when matrix_element_video_rooms_mode = 'element_call', domain of the Element Call instance to use for video calls
matrix_element_call_domain: "call.element.io"
# matrix element web client version (https://github.com/vector-im/element-web/releases)
matrix_element_version: "1.11.35"
# element installation directory
element_install_dir: "/var/www/{{ matrix_element_fqdn }}"
# HTTPS and SSL/TLS certificate mode for the matrix-element webserver virtualhost
#   letsencrypt: acquire a certificate from letsencrypt.org
#   selfsigned: generate a self-signed certificate
matrix_element_https_mode: selfsigned
# enable/disable the element virtualhost (redirect users to maintenance page if disabled)
matrix_element_enable_service: yes

```
````
````{tab-item} tasks/main.yml
Top-level set of tasks that call the various subsets of tasks. The `tags` allow you to only run specific sets of tasks eg. if you want to run all the tasks for your host relevant to its backup configuration
```yaml
- name: include variable checks tasks
  import_tasks: checks.yml
  tags:
    - matrix
    - synapse
    - element
    - checks
    - synapse-admin

- name: include postgresql configuration tasks
  import_tasks: postgresql.yml
  become: yes
  tags:
    - matrix
    - synapse

- name: include synapse configuration tasks
  import_tasks: synapse.yml
  become: yes
  tags:
    - matrix
    - synapse

- name: include element configuration tasks
  import_tasks: element.yml
  become: yes
  tags:
    - matrix
    - element

- name: include synapse-admin setup tasks
  import_tasks: synapse-admin.yml
  become: yes
  tags:
    - matrix
    - synapse-admin

- name: include firewalld configuration tasks
  import_tasks: firewalld.yml
  become: yes
  tags:
    - matrix
    - synapse
    - firewall
  when:
    - ansible_local.firewalld.ansible_managed is defined
    - ansible_local.firewalld.ansible_managed | bool

- name: include self-signed certificates configuration tasks
  import_tasks: ssl-selfsigned.yml
  become: yes
  tags:
    - matrix
    - synapse
    - element
    - ssl
  when:
    - ansible_local.apache.ansible_managed is defined
    - ansible_local.apache.ansible_managed | bool

- name: include nginx configuration tasks
  import_tasks: nginx.yml
  become: yes
  tags:
    - matrix
    - synapse
    - element
    - nginx
    - synapse-admin

- name: include rsnapshot/backups configuration tasks
  import_tasks: backups.yml
  become: yes
  tags:
    - matrix
    - synapse
    - backup
  when:
    - ansible_local.backup.ansible_managed is defined
    - ansible_local.backup.ansible_managed | bool

- name: include rsyslog configuration tasks
  import_tasks: rsyslog.yml
  become: yes
  tags:
    - matrix
    - synapse
    - monitoring
    - rsyslog
  when:
    - ansible_local.rsyslog.ansible_managed is defined
    - ansible_local.rsyslog.ansible_managed | bool

- name: include netdata configuration tasks
  import_tasks: netdata.yml
  become: yes
  tags:
    - matrix
    - synapse
    - monitoring
    - netdata
    - synapse-admin
  when:
    - ansible_local.netdata.ansible_managed is defined
    - ansible_local.netdata.ansible_managed | bool

- name: include ansible facts configuration tasks
  import_tasks: fact.yml
  become: yes
  tags:
    - matrix
    - synapse
    - element
    - synapse-admin

- name: apply configuration (flush handlers)
  meta: flush_handlers
  tags:
    - matrix
    - synapse
    - monitoring
    - fail2ban

```

````

`````