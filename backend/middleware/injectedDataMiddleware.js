var fs = require('fs'),
	replaceStream = require('replacestream');

module.exports = function(req, res, obj, error) {
	error = error || false;

	if (req.user) {
		obj.userName = req.user.firstName + ' ' + req.user.lastName;
		obj.role = req.user.role;
	}

	res.header = ('Content-Type', 'text/html');
	fs.createReadStream(__dirname + '/../../public/' + '_index.html')
		.pipe(replaceStream("[\"data_replace\"]", JSON.stringify(obj).replace(/'/g, "\\'").replace(/\\\"/g, "\\\\\"")))
		.pipe(replaceStream("window._is404Error = false;", "window._is404Error = " + error + ";"))
		.pipe(res);

	function populateInjectData(user, callback) {
		callback(null);
	}
};