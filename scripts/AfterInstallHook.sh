#!/bin/bash
set -e

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
. ~/.nvm/nvm.sh

# install node version
nvm install 16.18.1
nvm use 16.18.1
node --version

# run appa
node app/index.js
