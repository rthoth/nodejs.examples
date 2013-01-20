/**

*/

var fs = require('fs'),
		util = require('./util')
;

module.exports = function (directory) {

	return function (req, res) {
		
		var promise = util.pages([directory, req.param('oid')].join('/'));

		promise.then(
			function (pages) {
				res.set({
					'Accept-Ranges': 'page',
					'Content-length': pages,
					'Content-type': 'text/plain'
				});
				res.end();
			},
			function (err) {
				res.status(500).end(err.toString());
			}
		);
	};
};