'use strict';

/**
 * @ngdoc function
 * @name myApp.service: service.app
 * @description
 * # App Utility
 * 
 */
var service = function($q, $rootScope) {
	var me = this;
	
	me.init = function() {
		me.version = '@@ph-version';
		me.filterBreakpoint = 1400;
		me.mobileBreakpoint = 775; //775
		$rootScope.isMobile = false;
		$rootScope.isVisible = {
			navigation: false,
			content: false,
			filter: false,
		}
		$rootScope.filterText = 'FILTERS';
	}

	me.boot = function () {		
		me.init();
		me.events();
		me.animateCss();
		me.toggleVisibility();
		me.log('App Loaded: ', me.version);
	}

	me.events = function() {
		me.animateCss = function () {
			// Add animation class to execute only once
			$.fn.extend({
				animateCss: function (animationName) {
					var deferred = $q.defer();
					var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
					this.addClass('animated ' + animationName).one(animationEnd, function() {
						$(this).removeClass('animated ' + animationName);
						deferred.resolve(true)
					});
					return deferred.promise;
				}
			});
		}
		// Convert 10000 into 10,000
		me.string2thousands = function (string) {
			if (_.isNumber(string)){
				string = string.toString();
			}
			if (string.length >= 6 ) {
				return string.replace(/(\d+)(\d{3})(\d{3})/, '$1' + ',' + '$2' + ',' + '$3');
			} else {
				return string.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
			}
		}

		me.truncateText = function (s,l) {
			return s.substring(0, l) + '...';
		}
		me.toggleVisibility = function () {
			if (window.innerWidth > me.filterBreakpoint) {
				$rootScope.isMobile = false;
				$rootScope.isVisible.navigation = true;
				$rootScope.isVisible.content = true;
				$rootScope.isVisible.filter = true;
			} else if (window.innerWidth > me.mobileBreakpoint && window.innerWidth <= me.filterBreakpoint) {
				$rootScope.isMobile = false;
				$rootScope.isVisible.navigation = true;
				$rootScope.isVisible.content = true;
				$rootScope.isVisible.filter = false;
			} else {
				$rootScope.isMobile = true;
				$rootScope.isVisible.navigation = true;
				$rootScope.isVisible.content = false;
				$rootScope.isVisible.filter = false;
			}
		}
		$(window).resize(function(){
			me.toggleVisibility();
		});
		// Custom Logger
		me.log = function (type, message) {
			console.log('%c ' + type + ': ', 'color: red', message);
		};
	}

	return me.boot();
};
angular.module('service.app', []);
service.$inject = ['$q', '$rootScope'];
angular.module('service.app')
	.service('app', service);