FROM alpine

RUN apk --no-cache add openssl

WORKDIR /openssl-certs
VOLUME  /openssl-certs

ENTRYPOINT ["openssl"]
