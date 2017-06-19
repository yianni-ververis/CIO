angular.module('routes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider) { 
	$urlRouterProvider.otherwise("/management/");
	$stateProvider
	.state('index', {
		views: {
			"navigation" : {
				templateUrl: "views/navigation.html",
				controller: 'controller.navigation'  
			},
		}
	})
	.state('index.management', {
		url: "/management/",
		parent: 'index',
		views: {
			'main@': { 
				templateUrl: "views/management.html",
				controller: 'controller.management' 
			},
		}
	})
	.state('index.customer-service', {
		url: "/customer-service/",
		views: {
			'main@': { 
				templateUrl: "views/customer-service.html",
				controller: 'controller.customer-service' 
			},
		}
	})
	.state('index.development', {
		url: "/development/",
		views: {
			'main@': { 
				templateUrl: "views/development.html",
				controller: 'controller.development' 
			},
		}
	})
	.state('index.hr', {
		url: "/hr/",
		views: {
			'main@': { 
				templateUrl: "views/hr.html",
				controller: 'controller.hr' 
			},
		}
	})
	.state('index.test', {
		url: "/test/",
		views: {
			'main@': { 
				templateUrl: "views/test.html",
				controller: 'controller.test' 
			},
		}
	})
}]);