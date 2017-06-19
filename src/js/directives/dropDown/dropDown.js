';use strict';

/**
 * @name myApp.directive: dropDown
 * @author yianni.ververis@qlik.com
 * @param {object} dimension - Field to get the data from
 * @param {string} id - Div id for scope manipulation
 * @param {string} title - Initial text for the dropdown
 * @description
 * # dropDown
 * A simple bootstrap Drop Down
 */

var directive = ($parse, $sce, $compile, $timeout, api, utility, qlik) => {
	var me = {
		def: {
			restrict: 'AE',
			transclude: true
		}
	};

	me.boot = () => {
		// Get all the attributes
		me.def.scope = {
			dimension: '=',
			name: '=', // @Todo - is this obsolete?
			id: '=',
			title: '=',
			width: '=', // @Todo - is this obsolete?
		};

		me.def.link = (scope) => {
			scope.items = {};
			scope.currentItem = {
				qText: scope.title
			};
			scope.$watch('dimension', (newValue) => {
				api.getHyperCubeQ([newValue], []).then((data) => {
					scope.items = data;
				})
			});
			scope.dropDownChangeTitle = (obj) => {
				qlik.app.field(scope.dimension).select([obj.qElemNumber], false, false)
				scope.title = obj.qText;
				scope.currentItem = obj;
			}
		};
		
		me.def.template = '\n\
			<div class="btn-group" id="{{id}}">\n\
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n\
					{{currentItem.qText}} <span class="caret"></span>\n\
				</button>\n\
				<ul class="dropdown-menu scrollable-menu" role="menu">\n\
					<li ng-repeat="item in items"><a ng-click="dropDownChangeTitle(item[0])" ng-class="(currentItem.qElemNumber==item[0].qElemNumber)?\'active\':\'\'">{{item[0].qText}}</a></li>\n\
				</ul>\n\
			</div>';

		return me.def;
	}

	return me.boot();
}
angular.module('directive.dropDown', []);
directive.$inject = ['$parse', '$sce', '$compile', '$timeout', 'api', 'utility', 'qlik'];
angular.module('directive.dropDown')
	.directive('dropDown', directive);