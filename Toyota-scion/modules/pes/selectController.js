'use strict';

angular.module('selectModule')
	.controller('SelectController', function ($rootScope, $scope, $state, $location, consumer, utils, pesService, bysApi, bysCookies) {
		$scope.series = '';
		$scope.year = '';
		$scope.modelCode = '';

		$scope.selectSeries = function(event, series) {
			$scope.series = series.seriesCode;

			$scope.selectedSeries = series;
			if ($scope.availableSeries[$scope.series]) {
				var defaultTransmission     = (bysApi.defaultTransmission && bysApi.defaultTransmission.text);
				var alternativeTransmission = (bysApi.alternativeTransmission && bysApi.alternativeTransmission.text);
				var models = $scope.availableSeries[$scope.series].models;

				$scope.availableModels = {};
				for (var i = 0; i < models.length; i++) {
					var model = models[i];
					var key = (model.specialTitle) ? utils.cleanString(model.year+'_'+model.specialTitle) : model.year;

					if (!$scope.availableModels[key] && (model.transmission.toUpperCase().indexOf(defaultTransmission)>-1) ) {
						$scope.availableModels[key] = model;
					}
				}
				for (var i = 0; i < models.length; i++) {
					var model = models[i];
					var key = (model.specialTitle) ? utils.cleanString(model.year+'_'+model.specialTitle) : model.year;

					if (!$scope.availableModels[key] && (model.transmission.toUpperCase().indexOf(alternativeTransmission)>-1) ) {
						$scope.availableModels[key] = model;
					}
				}
				for (var i = 0; i < models.length; i++) {
					var model = models[i];
					var key = (model.specialTitle) ? utils.cleanString(model.year+'_'+model.specialTitle) : model.year;

					if (!$scope.availableModels[key]) {
						$scope.availableModels[key] = model;
					}

					$scope.availableModels[key]          = $scope.availableModels[key] || {};
					$scope.availableModels[key].position = i;
				}

				if (Object.keys($scope.availableModels).length===1) {
					for (var year in $scope.availableModels) {
						$scope.selectModel($scope.availableModels[year]);
						return;
					}
				} else if (Object.keys($scope.availableModels).length>1) {
					$scope.selectPage = '../modules/select/model/modelTemplate.html';
					event.preventDefault();
					return;
				}
			}
		};

		$scope.selectModel = function(model) {
			var series = $scope.availableSeries[$scope.series];

			$scope.year = model.year;
			$scope.modelCode = model.modelCode;

			var paymentCalculatorCookies = bysCookies.paymentCalc.get();
			var currentModel = {
				series: utils.cleanSeries($scope.series),
				year:   $scope.year
			};
			if (paymentCalculatorCookies && paymentCalculatorCookies.currentModel && !angular.equals(paymentCalculatorCookies.currentModel, currentModel)) {
				bysCookies.paymentCalc.destroy();
			}

			pesService.initialize({
				currentModel: {
					series:           series.title,
					seriesCode:       (series.seriesCode || series.title).replace('-','').toLowerCase(),
					year:             model.year,
					modelCode:        model.modelCode,
					title:            series.title + ' ' + model.transmission,
					msrpInt:          utils.formatCurrencyToNumber(model.msrp),
					totalMsrpInt:     utils.formatCurrencyToNumber(model.msrp),
					transmission:     utils.getTransmission(model.transmission),
					transmissionText: utils.getTransmission(model.transmission, true),
				}
			});

			$('#select-model').modal('hide');
		};

		$rootScope.reinit = function() {
			$scope.selectPage = '../modules/select/series/seriesTemplate.html';
		};

		$scope.$on('openVehicleSelector', function(event, data) {
			$scope.reinit();
		});

		// Retrieve zip-code
		$scope.$on('updateZipCode', function(event, data) {
			$scope.zipCode = data;
		});
		consumer.getZipCode();

		// Retrieve all models
		var deregisterCallback = $scope.$on('availableModelsReady', function(event, data) {
			$scope.availableSeries = data;
			utils.stopLoader();
			deregisterCallback();
		});
		consumer.getListAvailableModels();

	})
	.filter('orderObjectBy', function(){
		return function(input, attribute) {
			if (!angular.isObject(input)) {
				return input;
			}

			var inputArray = [];
			for(var key in input) {
				inputArray.push(input[key]);
			}

			inputArray.sort(function(a, b){
				a = parseInt(a[attribute]);
				b = parseInt(b[attribute]);
				return a - b;
			});

			return inputArray;
		};
	})
	.directive('bindHtmlDynamic', function ($compile) {
		return {
			restrict: 'A',
			link: function (scope, ele, attrs) {
				ele.html(attrs.bindHtmlDynamic);
				$compile(ele.contents())(scope);
			}
		};
	})
	.directive('stopEvent', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				element.on(attr.stopEvent, function (e) {
				  e.stopPropagation();
				});
			}
		};
	});
