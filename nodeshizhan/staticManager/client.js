var http = require('http'), 
	fs = require('fs'),
	url = require('url'),
	staticModule = require('./app');

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	
	if(pathname == '/favicon.ico'){
		return ;
	}else if(pathname == '/index' || pathname == '/'){
		goIndex(res);
	}else{
		staticModule.getStaticFile(pathname,res,req);
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