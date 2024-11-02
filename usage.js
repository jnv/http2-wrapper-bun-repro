    const http2 = require('http2-wrapper');

    const options = {
      hostname: 'nghttp2.org',
      protocol: 'https:',
      path: '/httpbin/post',
      method: 'POST',
      headers: {
        'content-length': 6,
      },
    };

    const request = http2.request(options, (response) => {
      console.log('statusCode:', response.statusCode);
      console.log('headers:', response.headers);

      const body = [];
      response.on('data', (chunk) => {
        body.push(chunk);
      });
      response.on('end', () => {
        console.log('body:', Buffer.concat(body).toString());
      });
    });

    request.on('error', console.error);

    request.write('123');
    request.end('456');

// statusCode: 200
// headers: [Object: null prototype] {
//   ':status': 200,
//   date: 'Fri, 27 Sep 2019 19:45:46 GMT',
//   'content-type': 'application/json',
//   'access-control-allow-origin': '*',
//   'access-control-allow-credentials': 'true',
//   'content-length': '239',
//   'x-backend-header-rtt': '0.002516',
//   'strict-transport-security': 'max-age=31536000',
//   server: 'nghttpx',
//   via: '1.1 nghttpx',
//   'alt-svc': 'h3-23=":4433"; ma=3600',
//   'x-frame-options': 'SAMEORIGIN',
//   'x-xss-protection': '1; mode=block',
//   'x-content-type-options': 'nosniff'
// }
// body: {
//   "args": {},
//   "data": "123456",
//   "files": {},
//   "form": {},
//   "headers": {
//     "Content-Length": "6",
//     "Host": "nghttp2.org"
//   },
//   "json": 123456,
//   "origin": "xxx.xxx.xxx.xxx",
//   "url": "https://nghttp2.org/httpbin/post"
// }
