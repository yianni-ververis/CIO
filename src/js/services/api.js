'use strict';

/**
 * @ngdoc function
 * @name myApp.service: api
 * @description
 * # api
 * Service of the myApp
 */
var service = function($q, $rootScope, app, qlik) {
	var me = this;
							
	me.getObjects = function (obj) {
		var deferred = $q.defer();
		var Promise = $q;
		var promises = obj.map(function(data) {
			return app.obj.app.getObject(data, data)
		}, this);					
		Promise.all(promises).then(function(data) {
			app.log('All objects loaded on', new Date());
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	me.destroyObjects = function () {
		var deferred = $q.defer();
		var promises = [];
		if (qlik.openModels.length >= 1) {
			angular.forEach(qlik.openModels, function(value) {
				value.close();
				deferred.resolve();
				promises.push(deferred.promise);
			});
			qlik.openModels = [];
		}
		if (qlik.openModels.length < 1) {
			deferred.resolve();
			promises.push(deferred.promise);
		}
		return $q.all(promises);
	};
	
	// To get generic Hypercubes
	me.getHyperCube = function (dimensions, measures, callback, limit) {
		var qDimensions = [],
			qMeasures = [];
		if (dimensions.length) {
			angular.forEach(dimensions, function(value) {
				qDimensions.push({ 
					qDef: { 
						qGrouping: "N", 
						qFieldDefs: [ value ], 
					},
					qNullSuppression: true, 
				});
			});
		}
		if (measures.length) {
			angular.forEach(measures, function(value) {
				qMeasures.push({ 
					qDef : { 
						qDef : value
					}
				});
			});
		}
		qlik.app.createCube({
			qDimensions : qDimensions,
			qMeasures : qMeasures,
			qInitialDataFetch : [{
				qTop : 0,
				qLeft : 0,
				qHeight : (limit)?limit:500,
				qWidth : 11
			}]
		}, function(reply) {
			app.log('getMeasureData:', 'Success!');
			callback(reply.qHyperCube.qDataPages[0].qMatrix);
		});
	};
	// Get Hypercube data. Using Promises
	me.getHyperCubeQ = function (dimensions, measures) {
		var qDimensions = [],
			qMeasures = [];
		if (dimensions.length) {
			angular.forEach(dimensions, function(value) {
				qDimensions.push({ 
					qDef: { 
						qGrouping: "N", 
						qFieldDefs: [ value ], 
					} 
				});
			});
		}
		if (measures.length) {
			angular.forEach(measures, function(value) {
				qMeasures.push({ 
					qDef : { 
						qDef : value
					}, 
					qSortBy: { 
						qSortByState: 0, 
						qSortByFrequency: 0, 
						qSortByNumeric: 0, 
						qSortByAscii: 0, 
						qSortByLoadOrder: 0, 
						qSortByExpression: 0, 
						qExpression: { 
							qv: "" 
						} 
					} 
				});
			});
		}
		var deferred = $q.defer();
		qlik.app.createCube({
			qDimensions : qDimensions,
			qMeasures : qMeasures,
			qInitialDataFetch : [{
				qTop : 0,
				qLeft : 0,
				qHeight : 500,
				qWidth : 11
			}]
		}, function(reply) {
			app.log('getHyperCubeQ:', 'Success!');
			deferred.resolve(reply.qHyperCube.qDataPages[0].qMatrix);
		});
		return deferred.promise;
	};

	me.getAllresults = function (dimensions, measures) {
		var deferred = $q.defer(),
			qTotalData = [],
			qDimensions = [],
			qMeasures = [];
			
		if (dimensions.length) {
			angular.forEach(dimensions, function(value) {
				qDimensions.push({ 
					qDef: { 
						qGrouping: "N", 
						qFieldDefs: [ value ], 
						qSortCriterias: [{
							qSortByAscii: (value==='SeriesName') ? 1 : 0, 
						}],
					} 
				});
			});
		}
		if (measures.length) {
			angular.forEach(measures, function(value) {
				qMeasures.push({ 
					qDef : { 
						qDef : value
					}
				});
			});
		}
		app.obj.app.createCube({
			qDimensions : qDimensions,
			qMeasures : qMeasures
		}).then(function(model) {
			model.getHyperCubeData('/qHyperCubeDef', [{qTop: 0, qWidth: 20, qLeft: 0, qHeight: 500}]).then(function(data) {
				var columns = model.layout.qHyperCube.qSize.qcx;
				var totalheight = model.layout.qHyperCube.qSize.qcy;
				var pageheight = Math.floor(10000 / columns);
				var numberOfPages = Math.ceil(totalheight / pageheight);
				if (numberOfPages==1) {
					deferred.resolve(data.qDataPages[0].qMatrix);
				} else {
					var promises=[],
						deferredPage = $q.defer();
					for (var i=0; i<numberOfPages; i++) {
						var page = {
							qTop: (pageheight * i) + i,
							qLeft: 0,
							qWidth: columns,
							qHeight: pageheight
						};
						model.getHyperCubeData('/qHyperCubeDef', [page]).then(function(data){
							deferredPage.resolve(data.qDataPages[0].qMatrix);
						});
						promises.push(deferredPage.promise);
					}
					$q.all(promises).then(function(data) {
						for (var j=0; j<data.length; j++) {
							for (var k=0; k<data[j].length; k++) {							
								qTotalData.push(data[j][k])
							}
						}
						deferred.resolve(qTotalData);
					});
				}
			})
		})
		return deferred.promise;
	}
	
	// NEW ADDITION CHECK THEM OUT FIRST
	me.getTable = function(dimensions, measures, options) {
		return app.obj.app.createTable(dimensions, measures, options);
	}

	// To get list of data
	me.createList = function (field, callback) {
		var NxPage = {
			qTop : 0,
			qLeft : 0,
			qHeight : 1000,
			qWidth : 0
		}
		app.obj.app.createList({
			qDef: {
				qFieldDefs: [
					field
				]
			},
			qInitialDataFetch: [NxPage]
		}, function(data) {
			// If we get all of the results
			if (data.qListObject.qSize.qcy==data.qListObject.qDataPages[0].qMatrix.length) {
				callback(data.qListObject.qDataPages[0].qMatrix)
			}
			// @TODO Pagination if we did not get all of the results
		})
	}
	me.createListPromise = function (field) {
		var deferred = $q.defer();
		var NxPage = {
			qTop : 0,
			qLeft : 0,
			qHeight : 1000,
			qWidth : 0
		}
		app.obj.app.createList({
			qDef: {
				qFieldDefs: [
					field
				]
			},
			qInitialDataFetch: [NxPage]
		}).then(function(model) {
			// console.log(model.layout.qListObject.qDataPages[0].qMatrix)
			// If we get all of the results
			if (model.layout.qListObject.qSize.qcy==model.layout.qListObject.qDataPages[0].qMatrix.length) {
				app.log('createListPromise:', 'Success!');
				deferred.resolve(model.layout.qListObject.qDataPages[0].qMatrix)
			}
			// @TODO Pagination if we did not get all of the results
		})

		return deferred.promise;
	}
	
	//https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/Methods/getList-method.htm
	me.getList = function (list, callback) {
		// OBJECT TYPES
		// FieldList
		// MeasureList
		// DimensionList
		// BookmarkList
		// SelectionObject
		// SnapshotList
		// MediaList
		// Sheet
		// MasterObject
		// VariableList
		// story
		switch(list) {
			case 'selections':
				app.obj.app.getList('SelectionObject', function(reply){
					callback(reply.qSelectionObject.qSelections);
				});
				break;

			default:
				callback(false);
				break;
		}	
	}
	
	// Add Google tracking
	me.ga = function (title) {
		ga('send', 'event', 'button', 'click', title, 1);
	};
// });
};
angular.module('service.api', []);
service.$inject = ['$q', '$rootScope', 'app', 'qlik'];
angular.module('service.api')
	.service('api', service);