"""
Use livereload to serve, build, and reload the website when files change.

from https://github.com/leouieda/pgcap/blob/main/tools/serve.py
"""
import logging
from livereload import Server, shell


server = Server()
files = [
    "slides/**/*.md",
    "slides/**/*.yml",
    "slides/img/*",
]
rebuild_all = [
    'slides/_toc.yml',
    'slides/_config.yml',
    "slides/**/*.css",
]
for filename in files:
    server.watch(filename, "jupyter-book build slides/ --path-output dist/")

for filename in rebuild_all:
    server.watch(filename, "jupyter-book build slides/ --all --path-output dist/")

livereload_logger = logging.getLogger("livereload")

max_attempts = 10
port = 8008
for i in range(max_attempts):
    try:
        server.serve(
            root="dist/_build/html",
            port=port,
            host="localhost",
            open_url_delay=1,
        )
        break
    except OSError:
        if i == max_attempts - 1:
            raise
        port += 1
        # Clear the logger to avoid having livereload duplicate the
        # handlers causing multiple prints of the same log messages.
        livereload_logger.handlers.clear()