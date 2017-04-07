var ParseDns = require('parse_dns.js'),
	MainIndex = require('Main_index.js');

exports.router = function(res,req,pathname){
	switch(pathname){
		case "/parse" : 
			ParseDns.parseDns(res,req);
			break;
		default:
			MainIndex.goIndex(res.,req);
			break;
	}
}