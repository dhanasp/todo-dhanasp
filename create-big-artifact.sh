#!/usr/bin/env bash

mkdir big
cd big
dd if=/dev/zero of=large-file-1gb.txt count=2048 bs=1048576

