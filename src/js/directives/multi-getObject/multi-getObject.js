';use strict';

/**
 * @name myApp.directive: multiGetObject
 * @author yianni.ververis@qlik.com
 * @param {object} data - the data needed to create the visualization.
 * @param {integer} height - the height of the Qlik Sense Object.
 * @param {boolean} header - If we ant to display Sense oject header.
 * @param {boolean} leftNav - If wa want to display the pages as a radio button to the left
 * @param {string} animation - Css class for the animation, if any.
 * @param {string} delay - he delay in seconds for the animation
 * @param {oolean} interaction - Enable/disable interaction of the Sense object.
 * @description
 * # Get multiple sense objects passed as an array of objects.
 * Directive of the myApp
 * <multi-get-object data="multiGetObject" height="150" animation="zoomInRight ms1000" header="false" interaction="false"></multi-get-object>
 * $scope.multiGetObject = {
		title: '',
		items: [ // Array that holds multiple pages with a radio button as page navigation
		{
			label: '',
			objects: [ // Array taht holds the Sense Objects ids and their labels as they will appear on top navigation
				{ label: 'Role', id:'WjJfRh' },
			],
			legend: [ // Array that will hold, if any, the legend for each page
				{class:'qlik-blue', value:'Employee'},
			]
		}
	]};
*/

var directive = ($parse, $sce, $compile, $timeout, qlik) => {
	var me = {
		def: {
			restrict: 'AE',
			replace: true
		}
	};

	me.boot = () => {
		me.def.scope = {
			data: '=',
			height: '=',
			header: '=',	
			leftNav: '=',
			animation: '@',
			delay: '@',	
			interaction: '='
		};

		me.def.link = (scope, element) => {
			var noInteraction = (angular.isUndefined(scope.interaction) || scope.interaction) ? false : true;				
			var noHeader = (angular.isUndefined(scope.header) || scope.header) ? false : true;
			scope.cssAnimation = '';
			scope.isMobile = scope.$root.isMobile;
			scope.$watchCollection('data', (data) => {
				scope.items = data.items;
				scope.title = data.title;
				// Assign random number from 0-100 for multiple directives
				scope.id = Math.floor((Math.random() * 100) + 1)
				scope.current = {
					pageIndex: 0,
					objectIndex: 0
				}
				scope.getObject();
			});
			scope.setCurrentObject = (index) => {
				scope.current.objectIndex = index;
				scope.getObject();
			}
			scope.setCurrentPage = (index) => {
				scope.current.pageIndex = index;
				scope.current.objectIndex = 0;
				scope.getObject();
			}
			scope.getObject = () => {
				qlik.app.getObject(element.find('#obj'), scope.items[scope.current.pageIndex].objects[scope.current.objectIndex].id, {noInteraction: noInteraction}).then((model) => {
					qlik.openModels.push(model);
					element.find('.qvobject').css({
						'height': scope.height,
						'max-width': window.innerWidth-50
					});
					if (noHeader) {
						element.find('.qv-object-header').remove();
					}
					// Animation
					if (scope.animation) {
						element.find('#obj').addClass('animated ' + scope.animation);
						scope.cssAnimation = 'animated ' + scope.animation;
					}
				});
			} 
		};
		
		me.def.templateUrl = 'js/directives/multi-getObject/multi-getObject.html';

		return me.def;
	};

	return me.boot();
}
angular.module('directive.multiGetObject', []);
directive.$inject = ['$parse', '$sce', '$compile', '$timeout', 'qlik'];
angular.module('directive.multiGetObject')
	.directive('multiGetObject', directive);