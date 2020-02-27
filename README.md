# Mutal TLS Testing

## Generating certs
```
cd openssl
docker build -t openssl .
docker run -it --rm -v [path to openssl-certs]:/openssl-certs openssl
```
See [generating-certs.md](./generating-certs.md)

## Running
```
cd haproxy
docker-compose up --build
```
