/***
这个例子需要：
1、模板引擎ejs
2、文件服务器
3、http
4、mysql
5、url
6、querystring
7、涉及的路由比较多，所以把路由的部分单独出来
**/

global.lib = {
	http : require('http'),
	fs : require('fs'),
	url : require('url'),
	querystring : require('querystring'),
	formidable:require('formidable'),
	ejs : require('ejs'),
	staticModule : require(__dirname + '/node_modules/staticModule'),
	router : require(__dirname + '/router'),
	mysql : require('mysql')
};
	
//创建数据库连接 设置访问数据库的用户名密码 和要访问的数据库的名字	
global.dbFun = {
	connection :lib.mysql.createConnection({
		user:"root",
		password:"123456",
		database:"nodedb"
	})
}


lib.http.createServer(function(request,response){
	lib.router.router(response,request);
}).listen(3000);
console.log("run at server http://127.0.0.1:3000");