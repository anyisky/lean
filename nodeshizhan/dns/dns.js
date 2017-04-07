//不建议一个文件中多次require同一个对象
var http = require('http'),					//http服务器创建
	dns = require('dns'),					//dns 解析当前dns域名 返回dns服务器的ip地址
	fs = require('fs'),						//文件操作
	url = require('url'),					//url处理文件url路径
	querystring = require('querystring');	//处理前端传回的字符串解析
	
function router(res,req,pathname){
	switch(pathname){
		case "/parse":
			parseDns(res,req);
			break;
		default:
			goIndex(res,req);
			break;
	}
}

function getDns(postData,callback){
	var domain = querystring.parse(postData).dns;//这里的dns 就是表单上的name的名字
	dns.resolve(domain,function(err,addresses){
		if(!addresses){
			addresses = ['不存在域名'];
		}
		callback(domain,addresses);
	});
}

/**
*
* @desc 异步post
* @params res http 请求对象
* @params req http 响应对象
*/
function parseDns(res,req){
	var postData = "";
	req.addListener("data",function(postDataChunk){
		postData += postDataChunk;
	});
	
	req.addListener("end",function(){
		var retData = getDns(postData,function(domain,addresses){
			res.writeHead(200,{'Content-Type':'text/html'});
			//这里可以扩展成获取模板  就类似于jsp的那种形式了
			res.end("<!DOCTYPE HTML><html lang='en-US'><head><meta charset='UTF-8'><title>DNS查询工具</title></head><body><h1>DNS查询工具</h1><P>Domain:<span style='color:red'>"+domain+"</span><br>IP: <span style='color:red'>"+addresses.join(',')+"</span></P></body></html>");
			return ;
		});
	});
}

/**
*
* @desc 定义响应html页面的函数
* @params res http 请求对象
* @params req http 响应对象
*/
function goIndex(res,req){
	
	
	var _dirname = 'views/';//这所请求的文件所在的目录
	
	//获取当前index.html的路径
	//这和jsp中数据抛到jsp页面上有哪种区别呢？jsp中找到jsp页面 好像都是不带后缀的
	var readPath = _dirname + url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);//读取文件内容
	
	//将获取的内容返回出来
	res.end(indexPage);
}
	
http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;//获取路由
	
	req.setEncoding("utf8");//设置返回值的编码格式
	//写http head返回html，因此Content-type为html
	res.writeHead(200,{'Content-Type':'text/html'});
	//根据路由不同，一种是返回json数据 一种是返回页面
	router(res,req,pathname);
}).listen(3000,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');