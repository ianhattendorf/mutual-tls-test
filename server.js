const fs = require('fs').promises;
const https = require('https');

const main = async () => {
  const args = process.argv.slice(2);
  const rejectUnauthorized = args.includes('reject-unauthorized');
  const useClientAuth = !args.includes('no-client-auth');
  const limitToTls12 = args.includes('tls-1.2');
  const cert = await fs.readFile('./openssl-certs/localhost.crt');
  const key = await fs.readFile('./openssl-certs/localhost.key');
  const ca = await fs.readFile('./openssl-certs/ca.crt');

  console.log({ useClientAuth, rejectUnauthorized, limitToTls12 });

  const options = {
    cert,
    key
  };
  if (limitToTls12) {
    options.maxVersion = 'TLSv1.2';
  }

  if (useClientAuth) {
    options.requestCert = true;
    options.rejectUnauthorized = rejectUnauthorized;
    options.ca = ca;
  }

  https.createServer(
    options,
    (req, res) => {
      console.log({
        auth: req.client.authorized,
        peerCert: req.client.getPeerCertificate(),
        protocol: req.client.getProtocol()
      });
      console.log(new Date());
      if (useClientAuth && !req.client.authorized) {
        res.writeHead(401);
        return res.end('Invalid client certificate authentication.');
      }

      res.writeHead(200);
      res.end(useClientAuth
        ? 'Valid client certificate authentication.'
        : 'Request OK.');
    }
  ).listen(9443);
};

main();
