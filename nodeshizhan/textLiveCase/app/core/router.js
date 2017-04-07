var Login = require(CON + 'login');//引入login模块

exports.router = function(res,req){
	var pathname = decodeURI(lib.url.parse(req.url).pathname);//路由
	
	lib.httpParam.init(req,res);//初始化get post的参数
	
	global.sessionLib = lib.session.start(res,req);//初始化session
	
	var model = pathname.substr(1),//路由除/以外的所有内容
		controller = lib.httpParam.GET('c'),//获取需要调用那个controller的代码 这边controller的代码指向是放在url的参数c中
		Class = '';
		
	if(pathname == '/favicon.ico'){//忽略ico的请求
		return ;
	}else if(pathname == '/'){//如果是主页，就跳去登录（这边其实要判断是否有登录，如果有登录 根据登录人 进入不同的页面？）
		res.render(VIEW + 'login.jade');
		return ;
	}else if(pathname.indexOf('static/') != -1){//如果请求的是静态资源文件，就直接走静态资源的入口，从这边看，还是把static放在这里比较合适
		lib.staticModule.getStaticFile(pathname, res, req, BASE_DIR);
		return ;
	}
	
	try{
		Class = require(CON + model);// 这边的model要么是空 要么就是login，如果多几种情况处理起来就比较麻烦，需要考虑更多
	}catch(e){//失败时默认是静态文件请求
		lib.staticModule.getStaticFile(pathname,res,req,BASE_DIR);
		return ;
	}
	
	if(Class){
		var login = new Login(res,req);//实例化login类
		
		var ret = login.checkSession(model);//判断用户是否登录
		
		if(ret){
			var object = new Class(res,req);//实例化当前模块类
			
			//controller 是一个字符串，所以点或者中括号取值，都是无法直接执行方法的，需要用call，这个方法可以到集团项目的考勤里试试，当时为了能执行，还特地转换成对象
			object[controller].call();//调用对象object的controller方法 controller是上面获取到的方法名的值
		}else{//如果未登录就跳去登录页面
			res.render(VIEW + 'login.jade');//没有登录的用户跳转到index页面
		}
	}else{//如果都没有找到对应的模块，那就直接404
		res.writeHead(404,{'Content-Type' : 'text/palin'});
		res.end('can not find source');
	}
}