'use strict';

/**
 * @ngdoc function
 * @owner yianni.ververis@qlik.com
 * @description
 * # app
 * Controller of the myApp
 */
var service = function($q, $rootScope, app) {
	var me = this;
			
	me.openModels = [];

	me.config = {
		host: '@@ph-host',
		prefix: '@@ph-prefix',
		port: '@@ph-port',
		id: '@@ph-id'
	};

	me.config.isSecure = (me.config.port==443) ? true : false;
	
	me.openApp = function () {		
		var deferred = $q.defer();
		me.app = qlik.openApp(me.config.id, me.config);
		deferred.resolve(true);
		return deferred.promise;
	}

	me.resize = function(qvid) {
		if (!angular.isUndefined) {
			qlik.resize(qvid)
		} else {
			qlik.resize()
		}
	}
	
	me.openApp();
	
	app.log('Qlik Loaded: ', 'Success!');
};
// angular.module('service.qlik', [])
// .service('qlik', function ($q, $rootScope, utility) {
angular.module('service.qlik', []);
service.$inject = ['$q', '$rootScope', 'app'];
angular.module('service.qlik')
	.service('qlik', service);