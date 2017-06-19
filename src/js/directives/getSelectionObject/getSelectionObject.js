';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: getSelectionObject
 * @description
 * # getSelectionObject
 * Directive that handles all of the selections. Gathers them and then creates a toolbar like sense
 */

var directive = ($parse, $sce, $compile, $timeout, $rootScope, qlik) => {
	var me = {
		def: {
			restrict: 'AE',
			replace: true
		},
	};

	me.boot = () => {
		me.def.scope = {
			// multiple: false
		};

		me.def.link = (scope) => {
			qlik.app.getList("SelectionObject", (reply) => {
				scope.isMobile = $rootScope.isMobile;
				scope.selections = [];
				scope.selectedFields = reply.qSelectionObject.qSelections;
				if (scope.selectedFields.length) {
					angular.forEach(scope.selectedFields, (value) => {
						if (value.qSelectedCount == 1) {
							scope.selections.push({
								field: value.qField,
								selected: [value.qSelected]
							});
						} else if (value.qSelectedCount > 1 && value.qSelectedCount <= 6) {
							scope.selections.push({
								field: value.qField,
								selected: value.qSelectedFieldSelectionInfo,
								total: value.qTotal
							});
						} else if (value.qSelectedCount > 6) {
							scope.selections.push({
								field: value.qField,
								selected: [`${value.qSelectedCount} of ${value.qTotal}`]
							});
						}
					})
					scope.toggle = () => {
						$('#dropdownMenuLink').dropdown('toggle')
					}
				}
			});
			scope.clearField = (field) => {
				qlik.app.field(field).clear();
			}
			scope.clearFieldItem = (field, item) => {
				qlik.app.field(field).toggleSelect(item, true);
			}
			scope.clearAll = () => {
				qlik.app.clearAll();
			}
		};
		me.def.templateUrl = 'js/directives/getSelectionObject/getSelectionObject.html';
		
		return me.def;
	};
	
	return me.boot();
// });
}
angular.module('directive.getSelectionObject', []);
directive.$inject = ['$parse', '$sce', '$compile', '$timeout', '$rootScope', 'qlik'];
angular.module('directive.getSelectionObject')
	.directive('getSelectionObject', directive);