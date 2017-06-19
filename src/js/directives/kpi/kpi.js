';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: KPI
 * @param expression. Just add the expression as you would in Qlik Sense
 * @description
 * # KPI
 * Directive of the myApp
 * <kpi expression=""></kpi>
 */

var directive = ($sce, api) => {
	var me = {
		def: {
			restrict: 'AE',
			transclude: true
		}
	};

	me.boot = () => {
		me.def.scope = {
			expression: '@'
		};

		me.def.link = (scope) => {
			scope.$watch('expression', (newValue) => {
				api.getHyperCubeQ([], [newValue]).then((data) => {
					scope.data = data[0][0];
				})
			});
			scope.renderHtml = (htmlCode) => {
				return $sce.trustAsHtml(htmlCode);
			};
		};
		
		me.def.template = '<span ng-class="{\'red\':data.qNum<0}" ng-bind-html="renderHtml(data.qText)"></span>';

		return me.def;
	}

	return me.boot();
}
angular.module('directive.kpi', []);
directive.$inject = ['$sce', 'api'];
angular.module('directive.kpi')
	.directive('kpi', directive);