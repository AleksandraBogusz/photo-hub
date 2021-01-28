#!/bin/bash
rm -rf frontend/build
rm -rf frontend/shared
rm -rf authentication-service/build
rm -rf authentication-service/shared
rm -rf search-service/build
rm -rf search-service/shared

docker-compose --file docker-compose-test.yml down
