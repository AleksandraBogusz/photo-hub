#!/bin/bash

./wait-for-it.sh -h azure-blob -p 10000 -t 10 && \
./request.sh