var querystring = require("querystring"),
	dns = require('dns');
	
exports.parseDns = function(res,req){
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

function getDns(postData,callback){
	var domain = querystring.parse(postData).dns;//这里的dns 就是表单上的name的名字
	dns.resolve(domain,function(err,addresses){
		if(!addresses){
			addresses = ['不存在域名'];
		}
		callback(domain,addresses);
	});
}
