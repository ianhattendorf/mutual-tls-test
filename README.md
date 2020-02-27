# Mutal TLS Testing

## Generating certs
```
cd openssl
docker build -t openssl .
docker run -it --rm -v [path to openssl-certs]:/openssl-certs openssl [command here]
```
NOTE: Don't use the plain openssl interactive command prompt (`openssl` without any additional arguments)
as it has issues with excecuting additional commands with a clean slate (some state is persisted between commands).

See [generating-certs.md](./generating-certs.md)

## Running
```
cd haproxy
docker-compose up --build
```
