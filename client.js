const https = require('https');
const fs = require('fs').promises;

const makeRequest = (options) => new Promise((resolve, reject) => {
  console.log('making request');
  const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      resolve(responseBody);
    });

    res.on('error', (err) => {
      reject(err);
    });
  });
  req.on('error', (err) => {
    reject(err);
  })
  req.end();
});

const main = async () => {
  const options = {
    hostname: 'localhost',
    port: 9443,
    path: '/',
    method: 'GET',
    ca: await fs.readFile('./openssl-certs/ca.crt')
  };

  for (let i = 0; i < 4; ++i) {
    try {
      const response = await makeRequest(options);
      console.log({ response });
    } catch (err) {
      console.log({ err });
    }
  }
};

main();
