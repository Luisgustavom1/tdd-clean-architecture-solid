#!/bin/bash
set -e

# install node version
nvm use 16.18.1
node --version

# run appa
node app/index.js
