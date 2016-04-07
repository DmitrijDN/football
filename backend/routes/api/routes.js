module.exports = function(app) {
	return {
		matchRoutes: require('./matchRoutes')(app),
		userRoutes: require('./userRoutes')(app),
	};
};