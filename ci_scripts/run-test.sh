#!/usr/bin/env bash
set -e

echo "*********** running npm test **************"

docker build -t test-todo .
docker run --entrypoint "npm test" test-todo:latest
