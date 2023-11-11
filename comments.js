// Create web server
// 1. create server
// 2. get request
// 3. get response
// 4. send response
// 5. listen to port
// 6. run server

// 1. create server
const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

// 2. get request
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(query, pathname);

  // 3. get response
  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
  }
  // Product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  // API page
  else if (pathname === '/api') {
    // 4. send response
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  // Not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

// 5. listen to port
server.listen(8000, '