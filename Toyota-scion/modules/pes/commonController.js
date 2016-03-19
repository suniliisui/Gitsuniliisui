'use strict';

angular.module('commonModule')
	.controller('CommonController', function ($rootScope, $scope, $modal, $interval, bysApi, utils, consumer, $sce, $state) {

		$scope.modalIndex = 0;

		$scope.initDisclaimers = function(disclaimers, staticDisclaimers, storeKey) {
			if (staticDisclaimers) {
				$scope.retrieveStaticDisclaimers(disclaimers);
			} else if (bysApi.isReady()) {
				$scope.retrieveDynamicDisclaimers(disclaimers);
			} else {
				$scope.$on('bysApiReady', function() {
					$scope.retrieveDynamicDisclaimers(disclaimers);
				});
			}

			if (storeKey) {
				utils.updateStoredDisclaimers(storeKey, disclaimers);
			}
		};

		$scope.retrieveStaticDisclaimers = function(disclaimers) {
			$scope.disclaimers = {};
			for (var i in disclaimers) {
				var disclaimerContent = disclaimers[i];
				if (disclaimerContent) {
					$scope.disclaimers[i] = utils.getStaticDisclaimer(disclaimerContent);
				}
			}
		};

		$scope.retrieveDynamicDisclaimers = function(disclaimers) {
			$scope.disclaimers = {};
			for (var i in disclaimers) {
				var disclaimerCode = disclaimers[i];
				if (disclaimerCode) {
					$scope.disclaimers[disclaimerCode] = utils.getDisclaimer(disclaimerCode);
				}
			}
		};

		$scope.initTooltips = function(tooltips, transparentIcon) {
			$scope.tooltips        = tooltips;
			$scope.transparentIcon = transparentIcon;
		};

		$scope.initAccessoryModal = function(accessory) {
			$scope.transparentIcon = true;
			$scope.accessory       = accessory;
		};

		$scope.disclaimerModal = function (index, staticDisclaimer, $event) {
			console.log('Open disclaimer:', index);
			var data = {};

			if($event) {
				$event.stopPropagation();
			}

			if (staticDisclaimer) {
				data = {
					staticDisclaimers: utils.getStaticDisclaimers(),
					index: (index-1)
				};
			} else {
				data = {
					disclaimerCodes: bysApi.getDisplayedDisclaimers(),
					index: (index-1)
				};
			}

			var modalInstance = $modal.open({
				controller: 'ModalController',
				templateUrl: '../modules/common/disclaimerModalTemplate.html',
				size: 'xl',
				windowClass: 'modalDisclaimer' + ' ' + (utils.getBrowser() ? ('browser-'+utils.getBrowser()) : ''),
				resolve: {
					data: function () {
						return data;
					}
				}
			});
		};

		$rootScope.zipcodeModal = function () {
			$('#zipcode-modal').modal();
		};

		$scope.customizePaymentsModal = function () {
			$rootScope.$broadcast('customizePaymentsReady', true);
			$('#customize-payments').modal();
		};

		$scope.kbbModal = function () {
			var tradeinTmp = $('#tradein').val();

			var modalInstance = $modal.open({
				controller: 'ModalController',
				templateUrl: '../modules/common/kbbModalTemplate.html',
				size: 'md',
				windowClass: 'modal' + ($scope.modalIndex++) + ' ' + (utils.getBrowser() ? ('browser-'+utils.getBrowser()) : ''),
				resolve: {
					data: function () {
						return {
							kbb: true,
						};
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
			}).finally(function () {
				if (tradeinTmp && (!$('#tradein').val() || !parseInt($('#tradein').val()))) {
					$('#tradein').val(tradeinTmp);
				}
				$scope.modalIndex--;
			});

			$('#tradein').val(0);
			var tradein = $('#tradein').val();
			var intervalPromise = $interval(function() {
				if (tradein!==$('#tradein').val()) {
					console.log('Trade In Value changed to: '+$('#tradein').val());

					$scope.temporaryFormValues                       = $scope.temporaryFormValues || {};
					$scope.temporaryFormValues.lease                 = $scope.temporaryFormValues.lease || {};
					$scope.temporaryFormValues.purchase              = $scope.temporaryFormValues.purchase || {};
					$scope.temporaryFormValues.lease.tradeInValue    = $('#tradein').val();
					$scope.temporaryFormValues.purchase.tradeInValue = $('#tradein').val();

					modalInstance.close();
					$interval.cancel(intervalPromise);
				}
			}, 1000);

			// var intervalPromiseTest = $interval(function() {
			// 	var tradein = 199;
			// 	console.log('Trade In Value changed to: '+tradein);
			// 	window.parent.document.getElementById('tradein').value = tradein;
			// 	$interval.cancel(intervalPromiseTest);
			// }, 1000);
		};

		$scope.calculatedModal = function (standAlone) {
			var paymentMethod = $scope.paymentCalculator.paymentMethod;
			$('#' + paymentMethod + '-calculated').modal();
		};
		
		$scope.selectModal = function () {
			$rootScope.$broadcast('openVehicleSelector');
			$('#select-model').modal();
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
