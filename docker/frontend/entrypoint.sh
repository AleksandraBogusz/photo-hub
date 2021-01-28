#!/bin/sh

cd /shared && \
npm install && \
cd ../build && \
npm install && \
npm start