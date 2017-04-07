//处理search参数
function parseUrlSearch(search){
    var resultObj = {};
    if(search && search.length > 1){
        var search = search.substring(1);
        var items = search.split('&');
        for(var index = 0 ; index < items.length ; index++ ){
            if(! items[index]){
                continue;
            }
            var kv = items[index].split('=');
            resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1];
        }
    }

    function _isEmptyObj(obj){
        for(var prop in obj){
            return false;
        }
        return true;
    }


    if(_isEmptyObj(resultObj)){
        return null;
    }else{
        return resultObj;
    }
}

//get
function renderPageToList(res,req){
	var str = lib.fs.readFileSync(__dirname + '/views/list.ejs','utf8');
	var opts = {};
	
	opts.pagaObj = {
		title:'文件-列表',
		vertion:'0.0.1'
	};
	
	//执行查询 并且把查询结果显示出来
	dbFun.connection.query("select * from picture;",function(err,rows,fields){
		//rows 是以json的格式被取出来的
		rows.forEach(function(item){
			item.updateTime = Number(item.updateTime);
		});
		opts.picList = rows;
		
		//模拟数据
		var html = lib.ejs.render(str,opts); 
		
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(html);
	}); 
}

//
function renderPageToAdd(res,req){
	var str = lib.fs.readFileSync(__dirname + '/views/edit.ejs','utf8');
	
	//模拟数据
	var html = lib.ejs.render(str,{  
		pagaObj:{
			title:'文件-新增',
			vertion:'0.0.1'
		},
		item:null
	}); 
	
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(html);
}

//post
function renderPageToEdit(res,req){
	var searchStr = lib.url.parse(req.url).search;
	var searchObj = parseUrlSearch(searchStr);
	
	var str = lib.fs.readFileSync(__dirname + '/views/edit.ejs','utf8');
	
	//模拟数据
	var html = lib.ejs.render(str,{  
		pagaObj:{
			title:'文件-编辑',
			vertion:'0.0.1'
		},
		item:{
			id:searchObj.id,
			sysname:'test',
			path:'123.jpg'
		}
	}); 
	
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(html);
}

//get
function renderPageToDetail(res,req){
	var searchStr = lib.url.parse(req.url).search;
	var searchObj = parseUrlSearch(searchStr);
	
	var opts = {};
	opts.pagaObj = {
		title:'文件-详情',
		vertion:'0.0.1'
	};
	
	
	//执行查询 并且把查询结果显示出来
	dbFun.connection.query("select * from picture where id="+searchObj.id+";",function(err,rows,fields){
		//rows 是以json的格式被取出来的
		rows.forEach(function(item){
			item.updateTime = Number(item.updateTime);
		});
		
		if(rows.length > 0){
			opts.attach = rows[0];
		}
		
		var str = lib.fs.readFileSync(__dirname + '/views/detail.ejs','utf8');
		var html = lib.ejs.render(str,opts); 
		
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(html);
	}); 
}

//post
function renderPageToPostDetail(res,req){
	var searchStr = lib.url.parse(req.url).search;
	var searchObj = parseUrlSearch(searchStr);
	
	var opts = {};
	opts.attach = {};
	
	if(searchObj && searchObj.id !== undefined){
		opts.attach.id = searchObj.id;
	}else{
		opts.attach.id = 1;
	}
	
	//附件处理的部分
	var form = new lib.formidable.IncomingForm();	
	form.uploadDir = __dirname + "/uploadFile";//必须设置（上传的文件的文件夹名字）
	
	var timestamp = Date.parse(new Date());
	form.parse(req,function(err,fields,files){
		var fileName = timestamp + '_' + files.file.name;//重新定义文件名
		lib.fs.renameSync(files.file.path,__dirname + '/uploadFile/'+fileName);
		opts.attach.path = '/uploadFile/'+fileName;
	});
	
	//post回来的其他参数
	var postData = "";
	req.addListener("data",function(postDataChunk){
		postData += postDataChunk;
	});
	
	req.addListener("end",function(){
		//其他参数
		opts.attach.sysname = lib.querystring.parse(postData).sysname;

		//重定向
		res.writeHead(301,{location:'/detail?id='+opts.attach.id});//301和302都是重定向的概念，但是301 是永久重定向 302 中间的还会存在，百度等搜索网站还是会抓到
		res.end();
		return ;
	});
}

exports.router = function(res,req){
	var pathname = decodeURI(lib.url.parse(req.url).pathname);//路由
	
	if(pathname == '/favicon.ico'){//忽略ico的请求
		return ;
	}else if(pathname == '/' || pathname == '/list'){//如果是主页，就跳去登录（这边其实要判断是否有登录，如果有登录 根据登录人 进入不同的页面？）
		renderPageToList(res,req);
		return ;
	}else if(pathname.indexOf('static/') != -1){//如果请求的是静态资源文件，就直接走静态资源的入口，从这边看，还是把static放在这里比较合适
		lib.staticModule.getStaticFile(pathname, res, req);
		return ;
	}else if(pathname.indexOf('uploadFile/') != -1){//附件目录
		lib.staticModule.getStaticFile(pathname, res, req);
		return ;
	}else if(pathname.indexOf('/add') != -1){//进入新增页 get
		renderPageToAdd(res,req);
		return ;
	}else if(pathname.indexOf('/edit') != -1){//进入编辑页 get
		renderPageToEdit(res,req);
		return ;
	}else if(pathname.indexOf('/detail') != -1){//进入详情页
		renderPageToDetail(res,req);
		return ;
	}else if(pathname.indexOf('/postToDetail') != -1){//提交，并最终到详情页
		renderPageToPostDetail(res,req);
	}else{
		res.writeHead(404,{'Content-Type' : 'text/palin'});
		res.end('can not find source');
	}
}