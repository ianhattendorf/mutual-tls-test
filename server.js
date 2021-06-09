const fs = require('fs').promises;
const https = require('https');

const main = async () => {
  const args = process.argv.slice(2);
  const rejectUnauthorized = args[0] === 'true';
  const cert = await fs.readFile('./openssl-certs/localhost.crt');
  const key = await fs.readFile('./openssl-certs/localhost.key');
  const ca = await fs.readFile('./openssl-certs/ca.crt');

  https.createServer(
    {
      cert,
      key,
      requestCert: true,
      rejectUnauthorized,
      ca
    },
    (req, res) => {
      if (!req.client.authorized) {
        res.writeHead(401);
        return res.end('Invalid client certificate authentication.');
      }
  
      res.writeHead(200);
      res.end('Valid client certificate authentication.');
    }
  ).listen(9443);  
};

main();
