var http = require('http'),
	mysql = require('mysql');

//创建数据库连接 设置访问数据库的用户名密码 和要访问的数据库的名字	
var connection = mysql.createConnection({
	user:"hcy",
	password:"654321",
	database:"nodedb"
});

http.createServer(function(request,response){
	//执行查询 并且把查询结果显示出来
	connection.query("select * from user;",function(err,rows,fields){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.end(JSON.stringify(rows));
	});
}).listen(3000);
console.log("run at server http://127.0.0.1:3000");