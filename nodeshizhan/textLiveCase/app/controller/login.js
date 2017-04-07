module.exports = function(){
	var _res = arguments[0];
	var _req = arguments[1];
	
	
	this.checkSession = function(model){
		if(model == 'login'){//如果本来/login页，就直接返回true
			return true;
		}else if(sessionLib.username && sessionLib.username != ''){
			return true;
		}
		return false;
	}
	
	this.login = function(){
		lib.httpParam.POST('username',function(value){
			sessionLib.username = value;
			
			//这里做复杂的话可以设置权限啥的，通过权限来决定是去哪个页面
			if(value == 'admin' || value == 'hcy'){//两个解说员
				
				_res.render(VIEW + 'live.jade',{'user':value});
				
			}else{
				_res.render(VIEW + 'main.jade',{'user':value});
			}
			var time = 0;
			//io.sockets.on('connection',function(socket){
			io.on('connection',function(socket){
				var username = sessionLib.username;
				
				if(!onlineList[username]){
					onlineList[username] = socket;
				}
				
				var refresh_online = function(){
					var n = [];
					for(var i in onlineList){
						n.push(i);
					}
					var message = lib.fs.readFileSync(BASE_DIR + '/live_data.txt','utf8');
					socket.emit('live_data',message);
					io.sockets.emit('online_list',n);//所有人广播
				}
				
				refresh_online();
				
				if(time > 0){
					return ;
				}
				
				socket.on('public',function(data){
					data.username = value;
					var insertMsg = "<li class='lh_180'><span>[" + value + "]</span><span>" + data.msg + "</span></li>";
					writeFile({'msg':insertMsg,'data':data},function(data){
						io.sockets.emit('msg',data);
					});
				});
				
				socket.on('disconnect',function(){
					delete onlineList[username];
					refresh_online();
				});
				time++;
			});
		});
		return ;
	}
	
	function writeFile(data,callback){
		var message = lib.fs.readFileSync(BASE_DIR + '/live_data.txt','utf8');
		lib.fs.writeFile(BASE_DIR + '/live_data.txt',message + data.msg,function(err){
			if(err) throw err;
			callback(data.data);
		});
	}
}