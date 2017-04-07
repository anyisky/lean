/***
设置路径全局变量 global是nodejs的全局变量 就和window一样 window.aaa 和直接用aaa是一样的，就是把方法或者变量挂到全局的去
***/
global.BASE_DIR = __dirname;//本系统根路径
global.APP = BASE_DIR + '/app/';//app文件夹的路径全局变量
global.CON = APP + '/controller/';
global.CORE = APP + '/core/';
global.LIB = BASE_DIR + '/node_modules/';
global.CONF = BASE_DIR + '/conf/';
global.STATIC = BASE_DIR + '/';//实际引用时带上了static 所以把这边的static去掉，或者是这边留着，实际引用时不加static
global.VIEW = BASE_DIR + '/view/';

global.lib = {//添加命名空间，避免变量重名
	http : require('http'),
	fs : require('fs'),
	url : require('url'),
	querystring : require('querystring'),
	
	httpParam : require(LIB + 'http_param'),
	staticModule : require(LIB + 'static_module'),
	router : require(CORE + 'router'),
	action : require(CORE + 'action'),
	
	jade : require('jade'),
	socket : require('socket.io'),
	path : require('path'),
	
	//parseCookie : require('connect').utils.parseCookie,//处理cookie的，新版本的这个已经弃用，可以知己引用cookie的包
	cookie:require('cookie'),
	
	session : require(LIB + 'node_session'),
	util : require('util')
};

//用于存储socket 用户信息
global.onlineList = [];

global.app = lib.http.createServer(function(req,res){
	res.render = function(){
		var template = arguments[0];//模板文件jade的文件名
		var options = arguments[1];//参数对象
		
		var str = lib.fs.readFileSync(template,'utf8');//同步获取模板文件的内容
		
		var fn = lib.jade.compile(str,{filename:template,pretty:true});//调用jade的方法，编译模板，把数据和模板整合起来
		
		var page = fn(options);
		
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(page);//将整合后的代码渲染出来
	}
	lib.router.router(res,req);//调用路由模块，实现url路由请求模块，根据url不同，返回不同的页面，由主入口引出router
	
}).listen(3000);
global.io = lib.socket.listen(app);
console.log('server run at http://127.0.0.1:3000');

