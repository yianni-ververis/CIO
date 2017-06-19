'use strict';
/** 
 * @ngdoc module
 * @name controller.hr
 * @author yianni.ververis@qlik.com
 * @description
 * Controller for the HR page
 */

var controller = ($scope, $rootScope, api, app) => {
	var me = {};
	
	// Initialize all variable
	me.init = () => {
		$rootScope.page = 'hr';
		$scope.wagesEmployees = {
			title: 'Wages & Employees',
			items: [
				{
					label: 'Wage Spread',
					objects: [
						{ label: 'Role', id:'UpHJh' },
						{ label: 'Grade', id:'CJLHshS' },
						{ label: 'Age Group', id:'3c4ee502-a554-48da-ad79-6b730efb30d0' },
						{ label: 'Year Month', id:'3a9d7d31-19bf-496d-a235-4aaea3637d95' },
					]
				},
				{
					label: 'Employee Count',
					objects: [
						{ label: 'Role', id:'WjJfRh' },
						{ label: 'Grade', id:'RHGDmQ' },
						{ label: 'Age Group', id:'cmQFm' },
						{ label: 'Year Month', id:'gbZMAr' },
					],
					legend: [
						{class:'qlik-blue', value:'Employee'},
						{class:'qlik-orange', value:'Consultant'},
					]
				}
			]
		};
		$scope.utilization = {
			title: 'Utilization',
			items: [
				{
					label: 'Sick Leave',
					objects: [
						{ label: 'Role', id:'uAreNZ' },
						{ label: 'Grade', id:'YwGerJn' },
						{ label: 'Age Group', id:'mawzm' },
						{ label: 'Year Month', id:'rkdxV' },
					]
				},
				{
					label: 'Utilization Rating',
					objects: [
						{ label: 'Role', id:'XftpTZs' },
						{ label: 'Grade', id:'AWYVxgY' },
						{ label: 'Age Group', id:'NjVte' },
						{ label: 'Year Month', id:'RTPnfY' },
					]
				}
			]
		};
	}
	
	me.boot = () => {
		me.init();		
		me.events();
		app.log('HR loaded: ', 'Success!');
	};

	// All events/interactions go here
	me.events = () => {
		// For debugging selections uncommment the line below
		// app.obj.app.getObject('CurrentSelections', 'CurrentSelections');
	}

	me.boot();
};
controller.$inject = ['$scope', '$rootScope', 'api', 'app'];
angular.module('controller.hr', [])
	.controller('controller.hr', controller);
