# A Tunnel is Built

## "Fuck that"

UCLA IT made me waste two weeks to compensate for their preposterous security theater, but we made a reverse proxy with [rathole](https://github.com/rapiz1/rathole)

## Rathole Config 

- `seed.aharoni-lab.com` points to the VPS with a public IP.
- Local server connects to VPS and creates a reverse tunnel

`````{div} flex-twocol
````{div} flex-col
Server Config
```toml
[server]
bind_addr = "0.0.0.0:2333"

[server.services.earthseed]
token = "TOKEN"
bind_addr = "0.0.0.0:5202"

[server.services.ssh]
token = "TOKEN"
bind_addr = "0.0.0.0:2222"

[server.transport]
type = "noise"

[server.transport.noise]
local_private_key = "PRIVATE KEY"
```
````
````{div} flex-col
Client Config
```toml
[client]
remote_addr = "seed.aharoni-lab.com:2333"

[client.services.earthseed]
token = "TOKEN"
local_addr = "127.0.0.1:80"

[client.services.ssh]
token = "TOKEN"
local_addr = "127.0.0.1:22"

[client.transport]
type = "noise"

[client.transport.noise]
remote_public_key = "PUBLIC KEY"
```
````
`````

## nginx Config

Nginx routes HTTP/S to the rathole ports

`````{div} flex-twocol
````{div} flex-col
```nginx
server {
   server_name seed.aharoni-lab.com;
   location / {
      proxy_pass http://127.0.0.1:5202;
      proxy_set_header    Host            $host;
      proxy_set_header    X-Real-IP       $remote_addr;
      proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_hide_header   X-Powered-By;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_read_timeout 86400;
   }


    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/seed.aharoni-lab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seed.aharoni-lab.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}
server {
    if ($host = seed.aharoni-lab.com) {
        return 301 https://$host$request_uri;
    }


   server_name seed.aharoni-lab.com;
   listen 80;
   listen [::]:80;
   return 404;
}


````
````{div} flex-col
````
`````