const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

const connectionurl =  'mongodb+srv://vaishnavi:vaishnavi@courses.mg3xsz3.mongodb.net/test';
const mongoDatabase =  'courses';
const mongoCollection =  'courses';

const mongoClientConnection = new MongoClient(connectionurl);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'Portfolio.html'), (error, data) => {
      if (error) {
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (req.url === '/api') {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Content-Type': 'application/json'
    };

    (async () => {
      try {
        await mongoClientConnection.connect();

        const database = mongoClientConnection.db(mongoDatabase);
        const collection = database.collection(mongoCollection);

        if (req.method === 'GET') {
          const docs = await collection.find({}).toArray();
          const docsJSON = JSON.stringify(docs, null, 2);

          fs.writeFile('./public/db.json', docsJSON, () => {});

          res.writeHead(200, headers);
          res.end(docsJSON);
        } else {
          res.writeHead(405, {'Content-Type': 'text/plain'});
          res.end('Method Not Supported');
        }
      } catch (err) {
        console.error(err);

        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Server failed to handle the request');
      }
    })();
  } else if (/\.(css|jpg|png|html)$/.test(req.url)) {
    const contentType = getContentType(req.url);
    const filePath = path.join(__dirname, 'public', req.url);

    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    });
  } else {
    res.end('<h1>Not Found</h1>');
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

function getContentType(url) {
  const extension = path.extname(url);

  switch (extension) {
    case '.css':
      return 'text/css';
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.html':
      return 'text/html';
    default:
      return 'text/plain';
  }
}
