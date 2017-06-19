'use strict';

/** 
 * @ngdoc function
 * @name myApp.controller:controller.development
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.dashboard
 * Controller of the myApp
 */

var MyController = ($scope, $rootScope, api, app, ga) => {
	var me = {};

	me.init = () => {
		$rootScope.page = 'customer-service';
		$scope.vars = {
			title: 'CUSTOMER SERVICE OVERVIEW'
		}
		me.measures = [
			["Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )", false]
		];
		$scope.kapi = [];
		$scope.multiGetObject = {
			title: 'SLA & CSAT',
			items: [
				{
					label: 'SLA & CSAT',
					objects: [
						{ label: 'Year Month', id:'YejJqC' },
						{ label: 'Portfolio', id:'gRkzE' },
						{ label: 'System Type', id:'RXmZjap' },
						{ label: 'Lifecycle', id:'JErzhY' },
					]
				},
				{
					label: 'Tickets',
					objects: [
						{ label: 'Year Month', id:'a1046484-2280-4231-9b62-281ab8c6d76b' },
						{ label: 'Portfolio', id:'8bb985ba-0a27-4ba2-9ccf-d512f9d314bf' },
						{ label: 'System Type', id:'e57f5d96-33ac-4940-a4d1-6faca2ed2d3b' },
						{ label: 'Lifecycle', id:'c11f4ca4-571e-4f24-a36d-39ff7401a922' },
					]
				}
			]
		};
		$scope.multiGetObjectResolvedCases = {
			title: 'Resolved Cases',
			items: [
				{
					label: 'Ticket Charts',
					objects: [
						{ label: 'Year Month', id:'a1046484-2280-4231-9b62-281ab8c6d76b' },
						{ label: 'Portfolio', id:'8bb985ba-0a27-4ba2-9ccf-d512f9d314bf' },
						{ label: 'System Type', id:'e57f5d96-33ac-4940-a4d1-6faca2ed2d3b' },
						{ label: 'Lifecycle', id:'c11f4ca4-571e-4f24-a36d-39ff7401a922' },	
						{ label: 'System', id:'12b7e54c-2c15-4b9a-acbb-7ccc1498b0a4' },
					]
				},
			]
		};
	}
	
	me.boot = () => {
		me.init();
		me.events();
		ga.pageview();
		app.log('Customer Service loaded: ', 'Success!');
	};

	me.events = () => { 
		// For debugging selections uncommment the line below
		// app.obj.app.getObject('CurrentSelections', 'CurrentSelections');
	}

	me.boot();
};
MyController.$inject = ['$scope', '$rootScope', 'api', 'app', 'ga'];
angular.module('controller.customer-service', [])
.controller('controller.customer-service', MyController);