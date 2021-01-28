FROM node:15.7.0-alpine3.10

COPY ./entrypoint.sh /
COPY ./build /build
COPY ./shared /shared

RUN apk add --no-cache bash && \
    chmod 744 ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]