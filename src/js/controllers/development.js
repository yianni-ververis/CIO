'use strict';

/** 
 * @ngdoc function
 * @name myApp.controller:controller.development
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.dashboard
 * Controller of the myApp
 */

var MyController = ($scope, $rootScope, api, app) => {
	var me = {};

	me.init = () => {
		$rootScope.page = 'development';
	}
	
	me.boot = () => {
		me.init();			
		me.events();
		me.toggleClasses();
		app.log('Development loaded: ', 'Success!');
	};

	me.events = () => {
		// For debugging selections uncommment the line below
		// app.obj.app.getObject('CurrentSelections', 'CurrentSelections');
		$(window).resize(() => {
			me.toggleClasses();
		});
		me.toggleClasses = () => {
			if (window.innerWidth<1130 && window.innerWidth>857) {
				$('.developmentBarChart').removeClass( "col-md-4 col-md-12" ).addClass( "col-md-6" );
			} else if (window.innerWidth<857) {
				$('.developmentBarChart').removeClass( "col-md-4 col-md-6" ).addClass( "col-md-12" );
			} else {
				$('.developmentBarChart').removeClass( "col-md-6 col-md-12" ).addClass( "col-md-4" );
			}
		}
	}

	me.boot();
};
MyController.$inject = ['$scope', '$rootScope', 'api', 'app'];
angular.module('controller.development', [])
.controller('controller.development', MyController);