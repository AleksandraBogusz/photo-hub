#!/bin/bash

(cd /userfiles/configsets/images && zip -r - *) > /userfiles/images.zip \
&& \
curl -X POST --header "Content-Type:application/octet-stream" \
    --data-binary @/userfiles/images.zip \
    "localhost:8983/solr/admin/configs?action=UPLOAD&name=images" \
&& \
curl "localhost:8983/solr/admin/collections?action=CREATE&name=images&numShards=1&maxShardsPerNode=1&replicationFactor=1&collection.configName=images"

