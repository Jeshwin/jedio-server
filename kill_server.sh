#!/bin/bash

lsof -i :3000 | awk '/node/ {print $2}' | xargs kill
