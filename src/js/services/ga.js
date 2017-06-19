'use strict';

/**
 * @ngdoc function
 * @name myApp.service: service.ga
 * @description
 * # Google Analytics
 */

var service = function ($window, $location, app) {
	var me = this;

	// YIANNI GA
	me.init = function() {
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		ga('create', '@@ps-ga', 'auto'); 

		app.log('Google Analytics loaded: ', 'Success!');
	}

	// GA Page tracking
	me.pageview = function () {
		app.log('Google Analytics pageview: ', 'Success!');
		ga('send', 'pageview', $location.path());
	};

	// GA buttontracking
	me.click = function (title) {
		app.log('Google Analytics click: ', 'Success!');
		ga('send', 'event', 'button', 'click', title, 1);
	};

	return me.init();

};
angular.module('service.ga', []);
service.$inject = ['$window', '$location', 'app'];
angular.module('service.ga')
	.service('ga', service);