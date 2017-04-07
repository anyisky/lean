var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end('hello world\n'+req.method);
}).listen(3001,"127.0.0.1");
console.log('server running at http://127.0.0.1:3001');

var request = require('request');

/* request.get('http://127.0.0.1:3001',function(error,response,result){
	
}); */

request.post('http://127.0.0.1:3001',{form:{'a':'123','b':'234'}},function(error,response,result){
	console.log(result);
});