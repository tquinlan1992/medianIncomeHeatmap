#!/bin/bash

. /etc/profile
cd /opt/client
nvm use
node server.js
