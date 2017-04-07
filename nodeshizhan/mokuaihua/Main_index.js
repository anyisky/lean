var fs = require('fs'),
	url = require('url');

//exports 是用于将模块的属性和方法暴露给require的
exports.goIndex = function(res,req){
	var _dirname = 'views/';//这所请求的文件所在的目录
	
	//获取当前index.html的路径
	//这和jsp中数据抛到jsp页面上有哪种区别呢？jsp中找到jsp页面 好像都是不带后缀的
	var readPath = _dirname + url.parse('index.html').pathname;
	var indexPage = fs.readFileSync(readPath);//读取文件内容
	
	//将获取的内容返回出来
	res.end(indexPage);
}