#!/bin/bash
set -e

# preparing setup
sudo apt-get install wget

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# install node version
nvm install 16.18.1
nvm use 16.18.1
node --version

# run appa
node index.js
