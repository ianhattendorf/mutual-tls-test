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

## Running HAProxy + Gogs
```
$ cd haproxy
$ docker-compose up --build
```

## Running node + curl

### Start server (optional client cert)
```
$ node server.js
```

### Request page without providing client cert: fails with 401
```
$ curl -v --cacert ./openssl-certs/ca.crt https://localhost:9443
...
Invalid client certificate authentication.
```

### Request page with providing client cert: succeeds with 200
```
$ curl -v --cacert ./openssl-certs/ca.crt --key ./openssl-certs/01-client.key --cert ./openssl-certs/01-client.crt https://localhost:9443
...
Valid client certificate authentication.
```

### Start server (required client cert)
```
$ node server.js true
```

### Request page without providing client cert: fails with TLS error
```
$ curl -v --cacert ./openssl-certs/ca.crt https://localhost:9443
...
* TLSv1.3 (IN), TLS alert, unknown (628):
* OpenSSL SSL_read: error:1409445C:SSL routines:ssl3_read_bytes:tlsv13 alert certificate required, errno 0
* Closing connection 0
curl: (56) OpenSSL SSL_read: error:1409445C:SSL routines:ssl3_read_bytes:tlsv13 alert certificate required, errno 0
```

### Request page with providing client cert: succeeds with 200
```
$ curl -v --cacert ./openssl-certs/ca.crt --key ./openssl-certs/01-client.key --cert ./openssl-certs/01-client.crt https://localhost:9443
...
Valid client certificate authentication.
```
