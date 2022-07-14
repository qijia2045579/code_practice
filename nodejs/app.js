// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 8080;
// I used the apache2 server to listen on the 2345\nodejs and forward it to the 8080 port
// The 8080 port is only open to local, so the outside is not maped, so, from the.jiaqi.org, it won't able to reach the 8080


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World! Node.js is working correctly. \n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require('express')
const path = require('path');
const app = express()
app.get('/', (req, res) => {
    // res.send('Hi! Coming through port 8080');
    res.sendFile(path.join(__dirname, '/htmls/template1.html'))
  });

app.listen(8080, () => console.log('Server ready'));




