var jade = require('jade');

var formidable = require('formidable'),
	fs = require('fs'),
	http = require('http'),
	url = require('url'),
	staticModule = require('./staticModule');

var BASE_DIR = __dirname;
	
function upload(res,req){
	var timestamp = Date.parse(new Date());
	var form = new formidable.IncomingForm();
	
	form.uploadDir="./uploadFile";//必须设置
	
	
	form.parse(req,function(err,fields,files){
		var fileName = timestamp + '_' + files.image.name;
		console.log(fileName);
		fs.renameSync(files.image.path,BASE_DIR + '/uploadFile/'+fileName);
		res.render('show.jade',{'imgUrl':'/uploadFile/'+fileName});
	});
}

function showImage(res,req){
	
}

function show(res,req){
	
}

function defaultIndex(res){
	res.render('form.jade',{'user':'hcy'});
}
	
http.createServer(function(req,res){
	res.render = function(template,options){
		var str = require('fs').readFileSync(template,'utf8');
		var fn = jade.compile(str,{filename:template,pretty:true});
		
		var page = fn(options);
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(page);
	}
	
	var pathname = url.parse(req.url).pathname;
	
	if(pathname == '/favicon.ico'){
		return ;
	}
	
	switch(pathname){
		case '/upload' : 
			upload(res,req);
			break;
		case '/image' :
			showImage(res,req);
			break;
		case '/' :
		case '/index' :
			defaultIndex(res);
			break;
		case '/show' : 
			show(res,req);
			break;
		default :
			staticModule.getStaticFile(pathname,res,req);
			break;
	};
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000');