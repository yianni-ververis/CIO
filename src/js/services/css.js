'use strict';

/**
 * @ngdoc function
 * @owner yianni.ververis@qlik.com
 * @description
 * # app
 * Controller of the myApp
 */
angular.module('factory.css', [])
.factory('css', function ($q, $rootScope, app) {
	var me = this;
			
	me.version = '0.0.1';
	
	me.createLink = function(id, url) {
		var link = document.createElement('link');
		link.id = id;
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		return link;
	}

	me.set = function (id, url) {
		me.link = me.createLink(id, url);
		angular.element('head').append(me.link);
	}

	app.log('CSS Factory Loaded: ', me.version);

	return me;
});