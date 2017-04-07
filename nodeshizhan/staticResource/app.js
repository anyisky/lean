var http = require('http'),
	url = require('url'),
	fs = require('fs');
	
var BASE_DIR = __dirname;

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	console.log(pathname);
	var realPath = __dirname + '/' + pathname;
	
	if(pathname == '/favicon.ico'){
		return ;
	}else if(pathname == '/index' || pathname == '/'){
		goIndex(res);
	}else{
		dealWithStatic(pathname,realPath,res);
	}
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000');

function goIndex(res){
	//获取当前index.html的路径
	//这和jsp中数据抛到jsp页面上有哪种区别呢？jsp中找到jsp页面 好像都是不带后缀的
	var readPath = __dirname + '/' + url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);//读取文件内容
	
	//将获取的内容返回出来
	res.end(indexPage);
}

function dealWithStatic(pathname,realPath,res){
	console.log('123');
	fs.exists(realPath,function(exists){
		console.log(exists);
		
		if(!exists){//如果文件不存在
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.write('this request url'+ pathname +"was not found on this server.");
			res.end();
		}else{
			var pointPostion = pathname.lastIndexOf('.'),
				mmieString = pathname.substring(pointPostion+1),
				mmieType;
				
			switch(mmieString){
				case 'css':
					mmieType = 'text/css';
					break;
				case 'jpg':
					mmieType = 'image/jpg';
					break;
				default:
					mmieType = 'text/plain';
					break;
			}
			
			fs.readFile(realPath,"binary",function(err,file){
				if(err){
					res.writeHead(500,{'Content-Type':'text/plain'});
					res.end(err);
				}else{
					res.writeHead(200,{'Content-Type':mmieType});
					res.write(file,"binary");
					res.end();
				}
			});
		}
	});
	
}