FROM ubuntu:bionic

COPY ./entrypoint.sh /
COPY ./request.sh /
COPY ./wait-for-it.sh /

RUN apt update && \
    apt install -y curl openssl xxd && \
    chmod 744 ./entrypoint.sh && \
    chmod 744 ./request.sh && \
    chmod 744 ./wait-for-it.sh

ENTRYPOINT ["./entrypoint.sh"]