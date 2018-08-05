/* eslint-env node */
/* global */
/** version 0.0.1 Maikaze 
 * url: https://github.com/Amarillys
 */
// 载入模块
var http = require('http');
var Note = require('./note');
var fs = require('fs');
var qs = require('querystring');
var notefile = new Note('note.txt');

function onRequest(req, resp) {
    var file = req.url.replace(/chat/g, '').replace('//', '');
    if (file[0] === '/') file = file.substr(1, file.length -1);
    console.log('url' + file);
    if (!file.substr(file.length - 5, 5).includes('.') && file.length < 3)
        file += 'index.html';
    if (file  === 'send') {
        req.on('data', function(data) {
            notefile.write('' + data);
            resp.writeHeader(200, {
                'content-type': 'text/plain;charset=utf-8'
            });
            resp.write('success');
            resp.end();
        });
     } else if (file === 'get') {
        req.on('data', function(data) {
            var params = qs.parse('' + data);
            resp.writeHeader(200, {
                'content-type': 'text/plain;charset=utf-8'
            });
            resp.write(notefile.read(params.start, params.limit).join(','));
            resp.end();
        });
     } else {
        if (file.indexOf('maikz') > -1) 
            file = file.replace('maikz', '..');
        console.log(file);
        fs.readFile(file, function(err, data) {
            // 404
            if (err) {
                resp.writeHeader(404, {
                    'content-type': 'text/html;charset=utf-8'
                });
                resp.write('<h1>404</h1><p>Page Not Found.</p>');
                resp.end();
            } else {
                // show the page
                var type = file.includes('css') ? 'text/css;charset=utf-8': 'text/html;charset=utf-8';
                resp.writeHeader(200, {
                    'content-type': type
                });
                resp.write(data);
                resp.end();
            }
        });
    }
}

// 创建服务器
http.createServer(onRequest).listen(3366);
