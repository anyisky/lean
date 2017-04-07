var formidable = require('formidable'),
	fs = require('fs'),
	http = require('http'),
	url = require('url'),
	staticModule = require('staticModule');

function upload(res,req){
	var timestamp = Date.parse(new Date());
	var form = new formidable.IncomingForm();
	
	form.parse(req,function(err,fields,files){
		var fileName = timetamp + '_' + files.image.name;
		fs.renameSync(files.image.path,BASE_DIR + '/uploadFile/'+fileName);
		res.render('show.jade',{'imgUrl':'/uploadFile/'+fileName});
	});
}

function showImage(res,req){
	
}

function show(res,req){
	
}

function defaultIndex(res){
	//获取当前index.html的路径
	//这和jsp中数据抛到jsp页面上有哪种区别呢？jsp中找到jsp页面 好像都是不带后缀的
	var readPath = __dirname + '/' + url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);//读取文件内容
	
	//将获取的内容返回出来
	res.end(indexPage);
}

http.createServer(function(req,res){
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