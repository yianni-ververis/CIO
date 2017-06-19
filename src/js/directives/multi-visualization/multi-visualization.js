';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: multiGetObject
 * @description
 * # Get multiple sense objects passed as an array of objects.
 * Directive of the myApp
 * <multi-get-object data="multiGetObject" height="150" animation="zoomInRight ms1000" header="false" interaction="false"></multi-get-object>
 */
var directive = (qlik) => {
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
			scope.cssAnimation = '';
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
				var currentObject = scope.items[scope.current.pageIndex].objects[scope.current.objectIndex];
				qlik.app.visualization.create(currentObject.type,currentObject.columns,{title:currentObject.label}).then(function(obj){
					obj.show(element.find('#obj'));
				}); 
			} 
		};
		
		me.def.templateUrl = 'js/directives/multi-visualization/multi-visualization.html';

		return me.def;
	};

	return me.boot();
}
angular.module('directive.multiVisualization', []);
directive.$inject = ['qlik'];
angular.module('directive.multiVisualization')
	.directive('multiVisualization', directive);