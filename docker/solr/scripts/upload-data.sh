#!/bin/bash


for file in /userfiles/data/*; do
    curl 'http://localhost:8983/solr/images/update?commit=true' \
        --data-binary @$file \
        --header 'Content-Type:application/json'
done