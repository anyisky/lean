var app = require('http').createServer(handler),
	fs = require('fs'),
	io = require('socket.io')(app);
	
app.listen(7070);

function handler(req,res){
	fs.readFile('index_client.html',function(err,data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading index_client.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection',function(socket){
	socket.emit('news',{hello:'world'});
	socket.on('my other event',function(data){
		console.log(data);
	});
});