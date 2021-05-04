#!/bin/bash

# List the blobs in an Azure storage container.
container_name="photos"
storage_account="account1"
access_key="key1"

blob_store_url="azure-blob:10000"
authorization="SharedKey"

request_method="PUT"
request_date=$(TZ=GMT date "+%a, %d %h %Y %H:%M:%S %Z")
storage_service_version="2020-06-12"

# HTTP Request headers
x_ms_date_h="x-ms-date:$request_date"
x_ms_version_h="x-ms-version:$storage_service_version"

# Build the signature string
canonicalized_headers="${x_ms_date_h}\n${x_ms_version_h}"
canonicalized_resource="/${storage_account}/${storage_account}/${container_name}"

string_to_sign="${request_method}\n\n\n\n\n\n\n\n\n\n\n\n${canonicalized_headers}\n${canonicalized_resource}\nrestype:container"

# Decode the Base64 encoded access key, convert to Hex.
decoded_hex_key="$(echo -n $access_key | base64 -d -w0 | xxd -p -c256)"

# Create the HMAC signature for the Authorization header
signature=$(printf "$string_to_sign" | openssl dgst -sha256 -mac HMAC -macopt "hexkey:$decoded_hex_key" -binary |  base64 -w0)

authorization_header="Authorization: $authorization $storage_account:$signature"

curl \
    -XPUT \
    -H "$x_ms_date_h" \
    -H "$x_ms_version_h" \
    -H "$authorization_header" \
    "http://${blob_store_url}/${storage_account}/${container_name}?restype=container"
