FROM haproxy
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN mkdir -p /etc/ssl/certs
COPY localhost.pem /etc/ssl/certs/server.pem
COPY ca.crt /etc/ssl/certs/ca.crt
EXPOSE 8080
EXPOSE 8443