/* var http = require('http');
http.createServer(function(req,res){
	console.log(__dirname);
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,"127.0.0.1");
console.log('server run at 3000');  */

var https = require('https'),
	fs = require('fs');
	
var options = {
	rejectUnauthorized: false,
	key:fs.readFileSync('certs/agent2-key.pem'),
	cert:fs.readFileSync('certs/agent2-cert.pem')
};
console.log(options.key);
console.log(options.cert);
https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3002);
console.log('server run at 3002'); 