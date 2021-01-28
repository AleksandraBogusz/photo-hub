#!/bin/bash
rm -rf frontend/build
rm -rf frontend/shared
rm -rf authentication-service/build
rm -rf authentication-service/shared
rm -rf search-service/build
rm -rf search-service/shared

cd .. && \
cp -r frontend docker/frontend/build && \
cp -r shared docker/frontend/shared && \
cp -r authentication-service docker/authentication-service/build && \
cp -r shared docker/authentication-service/shared && \
cp -r search-service docker/search-service/build && \
cp -r shared docker/search-service/shared

cd docker && \
docker-compose --file docker-compose-test.yml up -d --build
