require.config({
	baseUrl: '@@ph-baseUrl', 
	paths: {
		'domReady': '@@ph-scriptsUrl' + 'js/vendor/domReady',
		'tether': '@@ph-scriptsUrl' + 'js/vendor/tether.min', // for bootstrap 4 to work
		'bootstrap': '@@ph-scriptsUrl' + 'js/vendor/bootstrap.min',
		'ui.router': '@@ph-scriptsUrl' + 'js/vendor/angular-ui-router.min',
		'controllers': '@@ph-scriptsUrl' +'js/controllers',
		'services': '@@ph-scriptsUrl' +'js/services',
		'directives': '@@ph-scriptsUrl' +'js/directives',
	},
	shim : {
		"bootstrap" : ['jquery','tether'] ,
	},
});
require([
	'domReady', 
	'js/qlik',
	'angular',
	'bootstrap',
	'ui.router',
	'controllers',
	'services',
	'directives',	
], function (document, qlik) {
	window.qlik = qlik;
	qlik.setOnError( function ( error ) {
		if (!angular.isUndefined(error) && error.code == 16) {
			location.reload(false);
		} else {
			console.log(error);
		}
	} );

	angular.module('myApp', [
		'ngAnimate',
		'ui.router',
		'routes',
		'controller.management',
		'controller.customer-service',
		'controller.navigation',
		'controller.hr',
		'controller.development',
		'directive.getObject',
		'directive.multiGetObject',
		'directive.dropDown',
		'directive.getSelectionObject',
		'directive.kpi',
		'directive.multiVisualization',
		'service.app',
		'service.api',
		'service.qlik',
		'service.ga',
		'factory.css'
	])
	angular.bootstrap( document, ["myApp", "qlik-angular"] );
});
define([
	'require',
	'angular',
	'tether'
], function (require, angular, tether) {
	'use strict';
	window.Tether = tether; // For Bootstrap 4 to work
});
