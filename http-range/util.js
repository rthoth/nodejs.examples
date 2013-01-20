var Promise = require('promise'),
		fs = require('fs')
;

module.exports.pages = function (local) {
	
	return new Promise(function (resolver) {

		fs.readdir(local, function (err, files) {
			if (err)
				resolver.reject(err);
			else
				resolver.fulfill(files.length);
		});

	});

};