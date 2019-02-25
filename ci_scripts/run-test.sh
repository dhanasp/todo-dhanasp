#!/usr/bin/env bash
set -e

echo "*********** running npm test **************"

npm i -g nodemon && npm i -g mocha
npm install

npm test