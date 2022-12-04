#!/bin/bash
set -e

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

# install node version
nvm install 16.18.1
nvm use 16.18.1
node --version

# run appa
node index.js
