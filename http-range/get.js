/*
*/

var fs = require('fs');
var S = require('string');
var util = require('./util');

module.exports = function (directory) {

	return function (req, res) {

		var oid = req.param('oid');
		var page = req.get('range');


		if (page == undefined)
			res.status(400).end('You must define Range header');
		else {
			page = /\d+$/.exec(page)[0];

			page = S(page).padLeft(3, '0').s;
			var local = [directory, oid, 'x' + page].join('/');
			var promise = util.pages([directory, oid].join('/'));

			promise.then(

			function (pages) {
				var stream = fs.createReadStream(local,{
					bufferSize: 512 * 1024
				});
				console.log('Reading', local);

				stream.
					on('open', function (fd) {

						var status = fs.fstatSync(fd);
						res.status(206).set({
							'Content-type': 'text/plain',
							'Content-Range': 'page ' + page + "/" + pages,
							'Content-length': status.size
						});
					}).
					
					on('error', function () {
						stream.destroy();
						res.status(500).end("We can't read file!");
					}).

					on('data', function (buffer) {
						res.write(buffer);
					})
				;
			},
			function (err) {
				res.status(500).end('Pages error: ' + err.toString());
			});
		}
	}
};