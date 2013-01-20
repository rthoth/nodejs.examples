
/*
	Reference: http://benramsey.com/blog/2008/05/206-partial-content-and-range-requests/
*/

var express = require('express'),
		cors = require('connect-xcors'),
		head = require('./head'),
		get = require('./get')
;


var server = express();

server.
	use(cors({
		headers: ['Accept-Ranges', 'Content-length', 'Content-type', 'Content-Range', 'Date', 'Range']
	})).
	set('port', 8081).
	set('data_dir', __dirname + '/data')
;

server.
	head('/range/:oid', head(server.get('data_dir'))).
	get('/range/:oid', get(server.get('data_dir')))
;


server.listen(server.get('port'));

console.log('Nodejs Example Http Range listen on ' + server.get('port'));