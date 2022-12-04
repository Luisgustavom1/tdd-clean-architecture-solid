#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

nvm install 16.18.1
nvm use 16.18.1
npm install -g pnpm

ls -a home/ec2-user/app

pnpm build

node home/ec2-user/app/index.js
