#!/bin/bash

docker-entrypoint.sh -cloud &
/userfiles/scripts/wait-for-it.sh -h localhost -p 8983 -t 15 &&
/userfiles/scripts/create.sh &&
tail -f /dev/null