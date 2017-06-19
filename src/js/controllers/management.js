'use strict';

/** 
 * @ngdoc function
 * @name myApp.controller:controller.management
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.management
 */

var controller = ($scope, $rootScope, $location, $injector, qlik, api, app, ga) => {

	var me = {};

	me.init = () => {
		$rootScope.page = 'management';
		$rootScope.vars = {
			title: 'MANAGEMENT OVERVIEW',
		}
		$scope.checked = false;
		$scope.multiGetObject = {
			title: 'Cost Analysis',
			items: [
				{
					label: 'Cost vs Budget',
					objects: [
						{ label: 'System', id:'fJcxaEu' },
						{ label: 'Portfolio', id:'EDLPMcM' },
						{ label: 'System Type', id:'jVjbZDP' },
						{ label: 'Lifecycle', id:'FnEHdj' },
						{ label: 'Year Month', id:'WBCETJz' },
					]
				},
				{
					label: 'Cost Types Break-Down',
					objects: [
						{ label: 'System', id:'36359fd9-63ad-473a-a84a-a869e6acbd99' },
						{ label: 'Portfolio', id:'8987e51f-465a-46ab-b08d-da145d7abb5a' },
						{ label: 'System Type', id:'2bac5c5f-0765-4491-a1f6-fa43c1744a3a' },
						{ label: 'Lifecycle', id:'b5962127-4a08-4bd9-b0a1-44dc4b8f0029' },
						{ label: 'Year Month', id:'1f793799-30d9-4fe7-b681-91551bc91bb8' },
					]
				}
			]
		};

		$scope.multiGetObjectViz = {
			title: 'Cost Analysis',
			items: [
				{
					label: 'Cost vs Budget',
					objects: [
						{ label: 'Portfolio', type:'combochart', columns:['Portfolio','=sum({<Type={AM}>}[Cost] * History* _CurrYTD)','=sum({<Type={AM}>}[Cost Budget] * History* _CurrYTD)'] },
						{ label: 'System Type', type:'combochart', columns:['System Type','=sum({<Type={AM}>}[Cost] * History* _CurrYTD)','=sum({<Type={AM}>}[Cost Budget] * History* _CurrYTD)'] },
					]
				},
				{
					label: 'Cost Types Break-Down',
					objects: [
						{ label: 'Portfolio', id:'8987e51f-465a-46ab-b08d-da145d7abb5a' },
						{ label: 'System Type', id:'2bac5c5f-0765-4491-a1f6-fa43c1744a3a' },
						{ label: 'Lifecycle', id:'b5962127-4a08-4bd9-b0a1-44dc4b8f0029' },
						{ label: 'System', id:'36359fd9-63ad-473a-a84a-a869e6acbd99' },
						{ label: 'Year Month', id:'1f793799-30d9-4fe7-b681-91551bc91bb8' },
					]
				}
			]
		};
	}
	
	me.boot = () => {
		me.init();
		me.events();
		app.log('Management loaded: ', 'Success!');
	};

	me.events = () => {
		// For debugging selections uncommment the line below
		// qlik.app.getObject('CurrentSelections', 'CurrentSelections');
		qlik.app.getObject('kRJUp', 'kRJUp');
		ga.pageview();
	}

	me.boot();
};
controller.$inject = ['$scope', '$rootScope', '$location', '$injector', 'qlik', 'api', 'app', 'ga'];
angular.module('controller.management', [])
	.controller('controller.management', controller);