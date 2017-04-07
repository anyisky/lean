var BASE_DIR = __dirname,
	CONF = BASE_DIR + '/conf/',
	STATIC = BASE_DIR,
	mmieConf;
	
var sys = require('util'),
	http = require('http'),
	url = require('url'),
	fs = require('fs'),
	path = require('path');
	
mmieConf = getUrlConf();

var CACHE_TIME = 60 * 60 * 24 * 365;

/***
**/
exports.getStaticFile = function(pathname,res,req){
	//
	var extname = path.extname(pathname);
	extname = extname ? extname.slice(1) : '';
	
	var realPath = STATIC + pathname;
	var mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
	
	
	fs.exists(realPath,function(exists){
		if(!exists){//如果文件不存在
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.write('this request url'+ pathname +"was not found on this server.");
			res.end();
		}else{
			var fileInfo = fs.statSync(realPath);
			var ifModifiedSince = "If-Modified-Since".toLowerCase();
			
			var lastModified = fileInfo.mtime.toUTCString();
			
			
			//设置缓存
			if(mmieConf[extname]){
				var date = new Date();
				date.setTime(date.getTime() + CACHE_TIME * 1000);
				res.setHeader("Expires",date.toUTCString());
				res.setHeader("Cache-Control","max-age="+CACHE_TIME);
			}
			
			
			if(req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]){
				res.writeHead(304,"Not Modified");
				res.end();
			}else{
				fs.readFile(realPath,"binary",function(err,file){
					if(err){
						res.writeHead(500,{'Content-Type':'text/plain'});
						res.end(err);
					}else{
						res.setHeader("Last-Modified",lastModified);
						res.writeHead(200,{'Content-Type':mmieType});
						res.write(file,"binary");
						res.end();
					}
				});
			}
			
			
			
		}
	});
	
}

//获取mmie配置信息，读取配置文件
function getUrlConf(){
	var routerMsg = {};
	try{
		var str = fs.readFileSync(CONF + 'mmie_type.json','utf8');
		routerMsg = JSON.parse(str);
		
	}catch(e){
		sys.debug("JSON parse fails");
	}
	return routerMsg;
}
