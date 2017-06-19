';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: getObject
 * @param {string} qvid - object id as found in Qlik Sense Single.
 * @param {integer} height - the height of the div.
 * @param {boolean} interaction - if we want our Qlik Sense object to have interaction or not
 * @param {boolean} header - if we want our Qlik Sense object to have a header
 * @param {string} animation - the css class if we want to have animation
 * @description
 * # getObject
 * <get-object qvid="'pfFY'" height="100" interaction="false" header="false"></get-object>
 * For list of animation parameters go to 
 * https://daneden.github.io/animate.css/
 * https://github.com/daneden/animate.css
 */

var directive = ($parse, $sce, $compile, $timeout, qlik) => {
	var me = {
		def: {
			restrict: 'AE',
			replace: true,
			terminal: true
		}
	};

	me.boot = function () {
		me.def.scope = {
			qvid: '=',
			height: '=',
			interaction: '=',
			header: '=',
			animation: '@'
		};

		me.def.link = (scope, element) => {
			var noInteraction = (angular.isUndefined(scope.interaction) || scope.interaction) ? false : true;				
			var noHeader = (angular.isUndefined(scope.header) || scope.header) ? false : true;
			scope.$watch('qvid', () => { //(newValue)
				scope.getObject(noInteraction);
			}); 
			scope.getObject = (noInteraction) => {
				qlik.app.getObject(element.find('#obj'), scope.qvid, {noInteraction: noInteraction}).then((model) => {
					qlik.openModels.push(model);
					element.find('.qvobject').css({
						'height': scope.height,
					});
					if (noHeader) {
						element.find('.qv-object-header').remove();
					}
					// Animation
					if (scope.animation) {
						element.find('#obj').animateCss(scope.animation)
						.then(function(){
							qlik.resize(scope.qvid)
						})
					} else {
						qlik.resize(scope.qvid)
					}
				});
			} 
		};

		me.def.templateUrl = 'js/directives/getObject/getObject.html';

		return me.def;
	};

	return me.boot();
}
angular.module('directive.getObject', []);
directive.$inject = ['$parse', '$sce', '$compile', '$timeout', 'qlik'];
angular.module('directive.getObject')
	.directive('getObject', directive);