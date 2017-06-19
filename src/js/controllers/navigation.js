'use strict';

/** 
 * @ngdoc function
 * @name myApp.controller:controller.dashboard
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.dashboard
 * Controller of the myApp
 */

var controller = ($scope, $rootScope, $location, $injector, $q, api, app, qlik) => {
	var me = {};

	me.init = () => {
		$scope.nav = { 
			management: {
				title: 'MANAGEMENT',
				cost: {
					title: '2016 Cost YTD',
					expression: "num(sum([Cost] * History* _CurrYTD),'#,##0')"
				},
				budget: {
					title: 'vs Budget YTD',
					expression: "num(sum([Cost Budget] * History* _CurrYTD) - sum([Cost] * History* _CurrYTD),'#,##0')"
				},
				costBudgetDiff: {
					red: false,
					expression: "num((sum([Cost Budget] * History* _CurrYTD) - sum([Cost] * History* _CurrYTD))/(sum([Cost] * History* _CurrYTD)),'#,###.#0%')"
				},
				service: {
					title: 'Service Level',
					expression: "num(avg({<HDStatus=, _CurrYTD={1}>}SLA),'##.##%')"
				},
				serviceGoal: {
					title: 'Service Level Goal',
					value: '99.70',
				},
				serviceGoalDiff: {
					red: false,
					expression: "num((avg({<HDStatus=, _CurrYTD={1}>}SLA))-.9970,'##.##%')"
				}
			},
			customerService: {
				title: 'CUSTOMER SERVICE',
				grade: {
					title: 'Grade YTD',
					expression: "num(Avg({<HDStatus=, Year={$(=$(vMaxYear))}>}[Customer Grade]),'#,###.##')"
				},
				gradeTarget: {
					title: 'Grade Target',
					value: "3.75"
				},
				gradeDiff: {
					red: false,
					expression: "num(Avg({<[Case Status]=, Year={$(=$(vMaxYear))}>}[Customer Grade])-3.75,'##.##')"
				},
				resolvedTickets: {
					title: 'Resolved Tickets',
					expression: "num(sum({<HDStatus = {'Resolved'} >}ticketCounter),'#,##0')"
				},
				openTickets: {
					title: 'Open Tickets',
					expression: "num(sum({<HDStatus = {'Open', 'Pending'} >}ticketCounter),'#,##0')"
				},
				ticketsDiff: {
					red: false,
				},
				resolutionTime: {
					title: 'Avg Resolution Time (hrs)',
					expression: "num(((Date(Avg([resolution time]))-Floor(Avg([resolution time])))*(24*60))/60, '##.##')"
				},
				resolutionTimeTarget: {
					title: 'Resolution Time Target (hrs)',
					expression: "num(((Date(0.08334)-Floor(0.08334))*(24*60))/60, '##.##')"
				},
				resolutionDiff: {
					red: false,
					expression: "num((((Date(Avg([resolution time]))-Floor(Avg([resolution time])))*(24*60))-((Date(0.08334)-Floor(0.08334))*(24*60)))/60, '##.##')"
				},
			},
			development: {
				title: 'DEVELOPMENT',
				cost: {
					title: 'Development Cost YTD',
					expression: "num(sum({<Type={AD}>}[Cost] * History* _CurrYTD),'#,##0')"
				},
				budget: {
					title: 'vs Budget YTD',
					expression: "num(sum({<Type={AD}>}[Cost Budget] * History* _CurrYTD),'#,##0')"
				},
				costDiff: {
					red: false,
					expression: "num((num(sum({<Type={AD}>}[Cost Budget] * History* _CurrYTD),'#,##0') - num(sum({<Type={AD}>}[Cost] * History* _CurrYTD),'#,##0') )/num(sum({<Type={AD}>}[Cost] * History* _CurrYTD),'# ##0'), '##.##') "
				},
				utilization: {
					title: 'Utilization YTD',
					expression: "Num(sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, System -= {Idle}, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter * [Work per cent] )/sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter),'###%')"
				},
				utilizationTarget: {
					title: 'Utilization Target',
					value: "87.0%"
				},
				utilizationDiff: {
					red: false,
					expression: "Num((sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, System -= {Idle}, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter * [Work per cent] )/sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter))-0.87,'###%')"
				},
			},
			hr: {
				title: 'HR',
				employees: {
					title: 'Employees',
					expression: "num(Sum({<EmpType={Employee},Date={'$(vCurrentDate)'}>}EmployeeCounter),'#,##0')"
				},
				sickLeave: {
					title: 'Sick Leave YTD',
					expression: "num(avg({<_CurrYTD={1}>}[Sick Leave]),'##%')"
				},
				employeesDiff: {
					red: false,
					expression: "num(0.09-avg({<_CurrYTD={1}>}[Sick Leave]),'##%')"
				},
				utilization: {
					title: 'Utilization YTD',
					expression: "Num(sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, System -= {Idle}, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter * [Work per cent] )/sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter),'###%')"
				},
				utilizationTarget: {
					title: 'Target',
					value: "87.0%"
				},
				utilizationDiff: {
					red: false,
					expression: "Num((sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, System -= {Idle}, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter * [Work per cent] )/sum({<Year={$(=$(vMaxYear))}, _CurrYTD={1}, [Project Status]=, [Employee Type] = {Employee} >} [Work %] * EmployeeCounter))-0.87,'###%')"
				},
			},
		}
		$scope.kapi = [];
		$scope.selected = 0;
		$rootScope.lastAnimation = false;
		$('[data-toggle="tooltip"]').tooltip()
	}
	
	me.boot = () => {
		me.init();
		me.events();
		me.createKpis();
		app.log('Navigation loaded: ', 'Success!');
	};

	me.events = () => {
		me.createKpis = () => {
			var Promise = $q.defer();
			var promises = [];
			angular.forEach($scope.nav, (value) => { //, key
				angular.forEach(value, (value2) => { //, key2
					if (value2.expression) {
						promises.push(api.getHyperCubeQ([], [value2.expression]).then((data) => {
							value2.data = data[0][0];
							Promise.resolve(true);
						}));
					}
				});
			});
				
	// 		// Format data
			$q.all(promises).then(() => {
				$scope.nav.management.costBudgetDiff.red = ($scope.nav.management.costBudgetDiff.data.qNum<0) ? true : false;
				$scope.nav.management.serviceGoalDiff.red = ($scope.nav.management.serviceGoalDiff.data.qNum<0) ? true : false;				
				$scope.nav.customerService.gradeDiff.red = ($scope.nav.customerService.gradeDiff.data.qNum<0) ? true : false;
				$scope.nav.customerService.ticketsDiff.value = $scope.nav.customerService.resolvedTickets.data.qNum - $scope.nav.customerService.openTickets.data.qNum;	
				$scope.nav.customerService.ticketsDiff.red = ($scope.nav.customerService.ticketsDiff.value<0) ? true : false;
				$scope.nav.customerService.resolutionDiff.red = ($scope.nav.customerService.resolutionDiff.data.qNum<0) ? true : false;
				$scope.nav.development.costDiff.red = ($scope.nav.development.costDiff.data.qNum<0) ? true : false;
				$scope.nav.development.utilizationDiff.red = ($scope.nav.development.utilizationDiff.data.qNum<0) ? true : false;
				$scope.nav.hr.employeesDiff.red = ($scope.nav.hr.employeesDiff.data.qNum<0) ? true : false;
				$scope.nav.hr.utilizationDiff.red = ($scope.nav.hr.utilizationDiff.data.qNum<0) ? true : false;		
		
			})
		}
		$rootScope.clearAll = () => {
			qlik.app.clearAll();
		}
		$rootScope.goTo = (page) => {
			// api.destroyObjects().then(()=> {
				$location.url('/' + page + '/');
				qlik.resize()
			// })
			if ($rootScope.isMobile) {
				$rootScope.isVisible.navigation = false;
				$rootScope.isVisible.content = true;
				$rootScope.isVisible.filter = false;
			}
		}
		$rootScope.showDashboard = () => {
			$rootScope.isVisible.navigation = true;
			$rootScope.isVisible.content = false;
			$rootScope.isVisible.filter = false;
		}
		$rootScope.toggleFilter = () => {
			if ($rootScope.isMobile) {
				if ($rootScope.isVisible.filter) {
					$rootScope.isVisible.filter = false;
					$rootScope.isVisible.navigation = false;
					$rootScope.isVisible.content = true;
					$rootScope.filterText = 'FILTERS';
				} else {
					$rootScope.isVisible.filter = true;
					$rootScope.isVisible.navigation = false;
					$rootScope.isVisible.content = false;
					$rootScope.filterText = 'CLOSE FILTERS';
				}
			} else {
				if ($rootScope.isVisible.filter) {
					$rootScope.isVisible.filter = false;
					$rootScope.isVisible.navigation = true;
					$rootScope.isVisible.content = true;
					$rootScope.filterText = 'FILTERS';
				} else {
					$rootScope.isVisible.filter = true;
					$rootScope.isVisible.navigation = true;
					$rootScope.isVisible.content = true;
					$rootScope.filterText = 'CLOSE FILTERS';
				}
			}
			qlik.resize();
		}
		$rootScope.filters = () => {
			$rootScope.checked = ($rootScope.checked) ? false : true;
		}
		$rootScope.clearAll = () => {
			qlik.app.clearAll();
		}
	}

	me.boot();
};
controller.$inject = ['$scope', '$rootScope', '$location', '$injector', '$q', 'api', 'app', 'qlik'];
angular.module('controller.navigation', [])
	.controller('controller.navigation', controller);
