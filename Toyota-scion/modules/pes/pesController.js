'use strict';

function initializePaymentEstimator() {
	console.log('Initialize Payment Estimator');

	// JV::ToDo -- Remove Test Code
	var args = {};
	args.currentModel = {
		id:                           12345,
		series:                       'tC',
		title:                        'tC Automatic',
		year:                          2016,
		modelCode:                     6222,
		curbWeight:                    2,
		deliveryProcessingHandlingInt: 0,
		upgradesWithoutSnPTotalInt:    0,
		serviceandprotectionInt:       0,
		transmission:                  'AT',
		transmissionText:              'Automatic',
		timestamp:                     0,
	};
	args.selectedAccessories = {};
	args.currentDealer = {
		isPPP:      false,
		dealerCode: 4334,
	};
	args.user = {
		zipCode: 92663,
		state:   'CA',
	};
	args.application = {
		title:                    'Estimate Your Payments',
		showDetails:              true,
		showVehicleSelector:      true,
		showShoppingTools:        false,
		showHowCalculated:        true,
		showHuge:                 true,
		showZipCode:              true,
		showTransmissionSelector: true,
	};

	var element = angular.element(document.querySelector('[ng-controller]'));
	if (element.injector()) {
		var pesService = element.injector().get('pesService');
		var utils      = element.injector().get('utils');
		var bysCookies = element.injector().get('bysCookies');

		if (utils.isPesApp()) {
			// Retrieve most recent user's selection from cookies
			var data = bysCookies.vehiclePrefs.get();
			$.each(data, function(series, years) {
				$.each(years, function(year, vehiclePrefs) {
					if (args.currentModel.timestamp<parseInt(vehiclePrefs.timeStamp || 0)) {
						args.currentModel.series         = utils.formatSeries(series);
						args.currentModel.title          = args.currentModel.series + ' ' + args.currentModel.transmissionText;
						args.currentModel.year           = year;
						args.currentModel.modelCode      = 0;
						args.currentModel.colorCode      = vehiclePrefs.extColorCode;
						args.currentModel.favAccessories = vehiclePrefs.favAccessories;
						args.currentModel.timestamp      = parseInt(vehiclePrefs.timeStamp || 0);
					}
				});
			});

			pesService.initialize(args);
		}
	}
}

function paymentCalculatorReady() {
	console.log('Payment Calculator Ready');
	initializePaymentEstimator();
}

angular.module('pesModule')
	.controller('PesController', function ($rootScope, $scope, $timeout, $http, $modal, $window, utils, bysApi, bysCookies, paymentCalculator, consumer, config) {
		var self = this;

		$scope.isPesServiceReady = false;

		$scope.paymentCalculator = paymentCalculator;
		$scope.utils             = utils;

		$scope.defaultFormValues     = paymentCalculator.getDefaultFormValues();
		$scope.defaultDropdownValues = paymentCalculator.getDefaultDropdownValues();

		$scope.temporaryFormValues    = {};
		$scope.temporaryPaymentValues = {};
		$scope.paymentValues = {};
		$scope.data = {};

		bysApi.getAvailableDisclaimers();

		$scope.selectPage = '../modules/select/series/seriesTemplate.html';

		$scope.defaultFormArrays = {
			lease: {
				creditScore: utils.toArray($scope.defaultDropdownValues.lease.creditScore),
				termDuration: utils.toArray($scope.defaultDropdownValues.lease.termDuration),
				milesPerYear: utils.toArray($scope.defaultDropdownValues.lease.milesPerYear)
			},
			purchase: {
				creditScore: utils.toArray($scope.defaultDropdownValues.purchase.creditScore),
				termDuration: utils.toArray($scope.defaultDropdownValues.purchase.termDuration)
			}
		};

		$scope.initializePesService = function (event, pesService) {
			console.log('initializePesService');

			$scope.pesService          = pesService;
			$scope.seriesModels        = pesService.seriesModels;
			$scope.currentModel        = pesService.currentModel;
			$scope.selectedAccessories = pesService.selectedAccessories;
			$scope.currentDealer       = pesService.currentDealer;
			$scope.user                = pesService.user;
			$scope.application         = pesService.application;

			$scope.initialize();
		};

		$scope.initialize = function () {
			if (!Object.keys($scope.currentModel).length) {
				return false;
			}

			var imagePath        = $scope.currentModel.carSideImagePath || '../bys-content/img/car-images/fpo_select_side_'+$scope.currentModel.series+'.png';
			var imagePathColored = '../bys-content/img/car-images/pe-car-color/'+utils.cleanSeries($scope.currentModel.series)+'/'+$scope.currentModel.colorCode+'.png';

			if ($scope.currentModel.colorCode) {
				utils.isImage(imagePathColored).then(function(success) {
					if (success) {
						$scope.currentModel.imagePath = imagePathColored;
					} else {
						$scope.currentModel.imagePath = imagePath;
					}
				});
			} else {
				$scope.currentModel.imagePath = imagePath;
			}

			// Hitachi::ToDo -- Remove this if needed
			if (utils.isPesApp()) {
				// Force dealer from URL
				$scope.currentDealer = $scope.currentDealer || {};
				$scope.currentDealer.isPPP      = utils.getUrlParameter('isPPP') || $scope.currentDealer.isPPP;
				$scope.currentDealer.dealerCode = utils.getUrlParameter('dealerCode') || $scope.currentDealer.dealerCode;

				// Force zipCode from URL
				$scope.user = $scope.user || {};
				$scope.user.zipCode = utils.getUrlParameter('zipCode') || $scope.user.zipCode;
				$scope.user.state   = utils.getUrlParameter('state') || $scope.user.state;
			}

			$scope.title                    = $scope.application.title || 'Estimate Your Payments';
			$scope.isModalView              = Boolean($scope.application.isModalView);
			$scope.showModalButton          = Boolean($scope.application.showModalButton);
			$scope.showDetails              = Boolean($scope.application.showDetails);
			$scope.showVehicleSelector      = Boolean($scope.application.showVehicleSelector);
			$scope.showShoppingTools        = Boolean($scope.application.showShoppingTools);
			$scope.showHowCalculated        = Boolean($scope.application.showHowCalculated);
			$scope.showHuge                 = Boolean($scope.application.showHuge);
			$scope.showZipCode              = Boolean($scope.application.showZipCode);
			$scope.showTransmissionSelector = Boolean($scope.application.showTransmissionSelector);

			$scope.selectorTransmissions = [];
			if ($scope.showTransmissionSelector) {
				$scope.currentModel.seriesCode = ($scope.currentModel.series || $scope.currentModel.seriesTitle).replace('-','').toLowerCase();

				if ($scope.currentModel && $scope.currentModel.seriesCode && $scope.currentModel.year && $scope.seriesModels && $scope.seriesModels[$scope.currentModel.seriesCode] && $scope.seriesModels[$scope.currentModel.seriesCode][$scope.currentModel.year]) {
					var models = $scope.seriesModels[$scope.currentModel.seriesCode][$scope.currentModel.year];
					for (var i = 0; i < models.length; i++) {
						if (parseInt(models[i].modelCode)===parseInt($scope.currentModel.modelCode)) {
							$scope.selectorTransmission = models[i];
						}
						$scope.selectorTransmissions.push(models[i]);
					}
				} else {
					$scope.showTransmissionSelector = false;
				}

				$scope.selectedTransmission = ($scope.selectorTransmission && $scope.selectorTransmission.transmission) || $scope.currentModel.transmission;
			}

			$scope.currentModel.totalMsrpCurrency = utils.formatNumberToCurrency($scope.currentModel.totalMsrpInt);
			if (utils.isPesApp()) {
				$scope.currentModel.deliveryProcessingHandlingCurrency = utils.formatNumberToCurrency($scope.currentModel.deliveryProcessingHandlingInt);
				$scope.currentModel.upgradesWithoutSnPTotalCurrency    = utils.formatNumberToCurrency($scope.currentModel.upgradesWithoutSnPTotalInt);
				$scope.currentModel.serviceandprotectionCurrency       = utils.formatNumberToCurrency($scope.currentModel.serviceandprotectionInt);

				if (!$scope.currentModel.totalMsrpInt || ($scope.currentModel.msrpInt===$scope.currentModel.totalMsrpInt)) {
					$scope.currentModel.totalMsrpInt             = $scope.currentModel.msrpInt+$scope.currentModel.deliveryProcessingHandlingInt+$scope.currentModel.upgradesWithoutSnPTotalInt+$scope.currentModel.serviceandprotectionInt;
					$scope.currentModel.totalMsrpWithoutTaxesInt = $scope.currentModel.msrpInt+$scope.currentModel.deliveryProcessingHandlingInt+$scope.currentModel.upgradesWithoutSnPTotalInt+$scope.currentModel.serviceandprotectionInt;
				}

				$scope.currentModel.msrpCurrency                  = utils.formatNumberToCurrency($scope.currentModel.msrpInt);
				$scope.currentModel.totalMsrpCurrency             = utils.formatNumberToCurrency($scope.currentModel.totalMsrpInt);
				$scope.currentModel.totalMsrpWithoutTaxesCurrency = utils.formatNumberToCurrency($scope.currentModel.totalMsrpWithoutTaxesInt);
				$scope.totalMsrpInt      = $scope.currentModel.totalMsrpInt;
				$scope.totalMsrpCurrency = $scope.currentModel.totalMsrpCurrency;
			}

			if ($scope.showZipCode) {
				var deregisterCallbackZipCode = $scope.$on('updateZipCode', function(event, data) {
					$scope.data.zipCode = $scope.zipCode = data;

					deregisterCallbackZipCode();
				});
				consumer.getZipCode({noBroadcast:true});
			}

			if ($scope.showShoppingTools) {
				var deregisterCallbackShoppingTools = $scope.$on('updatePaymentEstimatorShoppingTools', function(event, response) {
					if (response && response.success) {
						$scope.shoppingTools = response.data;
					}
					deregisterCallbackShoppingTools();
				});
				consumer.getPaymentEstimatorShoppingTools({noBroadcast:true});
			}

			$scope.isPesServiceReady = true;
			$scope.form.reset();

			if (!utils.isPesApp()) {
				deregisterCallbackPesService();
			}
		};

		$scope.updateCurrentModel = function(event, pesService) {
			if (!Object.keys(pesService.currentModel).length) {
				return false;
			}

			$scope.currentModel           = pesService.currentModel;
			$scope.currentModel.imagePath = $scope.currentModel.carSideImagePath || '../bys-content/img/car-images/fpo_select_side_'+$scope.currentModel.series+'.png';
		};

		$scope.form = {
			formatValues: function (formValues) {
				for (var paymentMethod in formValues) {
					for (var key in formValues[paymentMethod]) {
						if (formValues[paymentMethod][key] && formValues[paymentMethod][key].key) {
							formValues[paymentMethod][key] = formValues[paymentMethod][key].key;
						}
					}
				}

				formValues.zipCode = ($scope.user && $scope.user.zipCode);
				formValues.state   = ($scope.user && $scope.user.state);

				return formValues;
			},

			clear: function () {
				$scope.form.reset({clear:true});
			},

			reset: function (args) {
				if (args && args.clear && $scope.defaultUIFormValues) {
					$scope.temporaryFormValues = angular.copy($scope.defaultUIFormValues);
				} else {
					$scope.temporaryFormValues = angular.copy($scope.paymentCalculator.formValues);
				}

				$scope.isStandaloneReady = ($scope.paymentCalculator.isReady && $scope.isPesServiceReady);

				if (!$scope.defaultUIFormValues || !$scope.defaultUIFormValues.lease || !$scope.defaultUIFormValues.purchase) {
					$scope.defaultUIFormValues = angular.copy($scope.temporaryFormValues);
				}

				$scope.form.recalculate({
					paymentMethod: 'lease',
					firstRequest:  true,
				});

				$scope.form.recalculate({
					paymentMethod: 'purchase',
					firstRequest:  true,
				});
			},

			recalculate: function (args) {
				$scope.form._recalculate({
					paymentMethod:       (args && args.paymentMethod),
					forceRecalculation:  (args && args.forceRecalculation),
					updateAPR:           (args && args.updateAPR),
					updateCreditScore:   (args && args.updateCreditScore),
					changePaymentMethod: (args && args.changePaymentMethod),
					firstRequest:        (args && args.firstRequest),
					userInput:           true,
				});
			},

			submit: function () {
				$scope.form._recalculate({
					closeModal:   true,
					userInput:    true,
				});
			},

			_validation_lease: function () {
				$scope.leaseForm = $scope.leaseForm || {};
				$scope.leaseForm.errorMessages = [];
				$scope.leaseForm.$valid = true;
				$scope.leaseForm.$submitted = true;

				$scope.temporaryFormValues       = $scope.temporaryFormValues || {};
				$scope.temporaryFormValues.lease = $scope.temporaryFormValues.lease || {};

				if ($scope.temporaryFormValues.lease.cashDown) {
					$scope.temporaryFormValues.lease.cashDown = ''+parseFloat($scope.temporaryFormValues.lease.cashDown);
				} else if ($scope.leaseFormUI && $scope.leaseFormUI.cashDown && !$scope.leaseFormUI.cashDown.$$rawModelValue) {
					$scope.temporaryFormValues.lease.cashDown = '0';
				}
				$scope.leaseForm.cashDown = $scope.leaseForm.cashDown || {};
				$scope.leaseForm.cashDown.$invalid = false;
				var cashDown = ($scope.temporaryFormValues.lease.cashDown && parseFloat($scope.temporaryFormValues.lease.cashDown));
				if ((!cashDown && cashDown!==0)) {
					$scope.leaseForm.cashDown.$invalid = true;
					$scope.leaseForm.$valid            = ($scope.leaseForm.$valid && !$scope.leaseForm.cashDown.$invalid);
					// $scope.leaseForm.errorMessages.push('Please provide a valid cash down value higher than $0.');
				}

				if ($scope.temporaryFormValues.lease.tradeInValue) {
					$scope.temporaryFormValues.lease.tradeInValue = ''+parseFloat($scope.temporaryFormValues.lease.tradeInValue);
				} else if ($scope.leaseFormUI && $scope.leaseFormUI.tradeInValue && !$scope.leaseFormUI.tradeInValue.$$rawModelValue) {
					$scope.temporaryFormValues.lease.tradeInValue = '0';
				}
				$scope.leaseForm.tradeInValue = $scope.leaseForm.tradeInValue || {};
				$scope.leaseForm.tradeInValue.$invalid = false;
				var tradeInValue = ($scope.temporaryFormValues.lease.tradeInValue && parseFloat($scope.temporaryFormValues.lease.tradeInValue));
				if ((!tradeInValue && tradeInValue!==0) || tradeInValue<0) {
					$scope.leaseForm.tradeInValue.$invalid = true;
					$scope.leaseForm.$valid                = ($scope.leaseForm.$valid && !$scope.leaseForm.tradeInValue.$invalid);
					// $scope.leaseForm.errorMessages.push('Please provide a valid trade-in value higher than $0.');
				}

				if ($scope.temporaryFormValues.lease.owedOnTradeIn) {
					$scope.temporaryFormValues.lease.owedOnTradeIn = ''+parseFloat($scope.temporaryFormValues.lease.owedOnTradeIn);
				} else if ($scope.leaseFormUI && $scope.leaseFormUI.owedOnTradeIn && !$scope.leaseFormUI.owedOnTradeIn.$$rawModelValue) {
					$scope.temporaryFormValues.lease.owedOnTradeIn = '0';
				}
				$scope.leaseForm.owedOnTradeIn = $scope.leaseForm.owedOnTradeIn || {};
				$scope.leaseForm.owedOnTradeIn.$invalid = false;
				var owedOnTradeIn = ($scope.temporaryFormValues.lease.owedOnTradeIn && parseFloat($scope.temporaryFormValues.lease.owedOnTradeIn));
				if ((!owedOnTradeIn && owedOnTradeIn!==0) || owedOnTradeIn<0) {
					$scope.leaseForm.owedOnTradeIn.$invalid = true;
					$scope.leaseForm.$valid                 = ($scope.leaseForm.$valid && !$scope.leaseForm.owedOnTradeIn.$invalid);
					// $scope.leaseForm.errorMessages.push('Please provide a valid owed-on trade-in value higher than $0.');
				}

				$scope.leaseForm.total = $scope.leaseForm.total || {};
				$scope.leaseForm.total.$invalid = false;
				var total = parseFloat($scope.temporaryFormValues.lease.cashDown || 0) + parseFloat($scope.temporaryFormValues.lease.tradeInValue || 0) + parseFloat($scope.temporaryFormValues.lease.owedOnTradeIn || 0);
				if ($scope.currentModel && (total > $scope.currentModel.totalMsrpInt)) {
					$scope.leaseForm.cashDown.$invalid      = true;
					$scope.leaseForm.tradeInValue.$invalid  = true;
					$scope.leaseForm.owedOnTradeIn.$invalid = true;
					$scope.leaseForm.total.$invalid = true;
					$scope.leaseForm.$valid         = ($scope.leaseForm.$valid && !$scope.leaseForm.total.$invalid);
					$scope.leaseForm.errorMessages.push('The amount entered exceeds the value of the car or results in a negative monthly payment');
				}

				return $scope.leaseForm.$valid;
			},

			_validation_purchase: function () {
				$scope.purchaseForm = $scope.purchaseForm || {};
				$scope.purchaseForm.errorMessages = [];
				$scope.purchaseForm.$valid = true;
				$scope.purchaseForm.$submitted = true;

				$scope.temporaryFormValues          = $scope.temporaryFormValues || {};
				$scope.temporaryFormValues.purchase = $scope.temporaryFormValues.purchase || {};

				if ($scope.temporaryFormValues.purchase.cashDown) {
					$scope.temporaryFormValues.purchase.cashDown = ''+parseFloat($scope.temporaryFormValues.purchase.cashDown);
				} else if ($scope.purchaseFormUI && $scope.purchaseFormUI.cashDown && !$scope.purchaseFormUI.cashDown.$$rawModelValue) {
					$scope.temporaryFormValues.purchase.cashDown = '0';
				}
				$scope.purchaseForm.cashDown = $scope.purchaseForm.cashDown || {};
				$scope.purchaseForm.cashDown.$invalid = false;
				var cashDown = ($scope.temporaryFormValues.purchase.cashDown && parseFloat($scope.temporaryFormValues.purchase.cashDown));
				if ((!cashDown && cashDown!==0) || cashDown<0) {
					$scope.purchaseForm.cashDown.$invalid = true;
					$scope.purchaseForm.$valid            = ($scope.purchaseForm.$valid && !$scope.purchaseForm.cashDown.$invalid);
					// $scope.purchaseForm.errorMessages.push('Please provide a valid cash down value higher than $0.');
				}

				if ($scope.temporaryFormValues.purchase.tradeInValue) {
					$scope.temporaryFormValues.purchase.tradeInValue = ''+parseFloat($scope.temporaryFormValues.purchase.tradeInValue);
				} else if ($scope.purchaseFormUI && $scope.purchaseFormUI.tradeInValue && !$scope.purchaseFormUI.tradeInValue.$$rawModelValue) {
					$scope.temporaryFormValues.purchase.tradeInValue = '0';
				}
				$scope.purchaseForm.tradeInValue = $scope.purchaseForm.tradeInValue || {};
				$scope.purchaseForm.tradeInValue.$invalid = false;
				var tradeInValue = ($scope.temporaryFormValues.purchase.tradeInValue && parseFloat($scope.temporaryFormValues.purchase.tradeInValue));
				if ((!tradeInValue && tradeInValue!==0) || tradeInValue<0) {
					$scope.purchaseForm.tradeInValue.$invalid = true;
					$scope.purchaseForm.$valid                = ($scope.purchaseForm.$valid && !$scope.purchaseForm.tradeInValue.$invalid);
					// $scope.purchaseForm.errorMessages.push('Please provide a valid trade-in value higher than $0.');
				}

				if ($scope.temporaryFormValues.purchase.owedOnTradeIn) {
					$scope.temporaryFormValues.purchase.owedOnTradeIn = ''+parseFloat($scope.temporaryFormValues.purchase.owedOnTradeIn);
				} else if ($scope.purchaseFormUI && $scope.purchaseFormUI.owedOnTradeIn && !$scope.purchaseFormUI.owedOnTradeIn.$$rawModelValue) {
					$scope.temporaryFormValues.purchase.owedOnTradeIn = '0';
				}
				$scope.purchaseForm.owedOnTradeIn = $scope.purchaseForm.owedOnTradeIn || {};
				$scope.purchaseForm.owedOnTradeIn.$invalid = false;
				var owedOnTradeIn = ($scope.temporaryFormValues.purchase.owedOnTradeIn && parseFloat($scope.temporaryFormValues.purchase.owedOnTradeIn));
				if ((!owedOnTradeIn && owedOnTradeIn!==0) || owedOnTradeIn<0) {
					$scope.purchaseForm.owedOnTradeIn.$invalid = true;
					$scope.purchaseForm.$valid                 = ($scope.purchaseForm.$valid && !$scope.purchaseForm.owedOnTradeIn.$invalid);
					// $scope.purchaseForm.errorMessages.push('Please provide a valid owed-on trade-in value higher than $0.');
				}

				if ($scope.temporaryFormValues.purchase.estimatedAPR) {
					$scope.temporaryFormValues.purchase.estimatedAPR = ''+parseFloat($scope.temporaryFormValues.purchase.estimatedAPR);
				}
				$scope.purchaseForm.estimatedAPR = $scope.purchaseForm.estimatedAPR || {};
				$scope.purchaseForm.estimatedAPR.$invalid = false;
				var estimatedAPR = ($scope.temporaryFormValues.purchase.estimatedAPR && parseFloat($scope.temporaryFormValues.purchase.estimatedAPR));
				if ((!estimatedAPR && estimatedAPR!==0) || (estimatedAPR<0 || estimatedAPR>100)) {
					$scope.purchaseForm.estimatedAPR.$invalid = true;
					$scope.purchaseForm.$valid                = ($scope.purchaseForm.$valid && !$scope.purchaseForm.estimatedAPR.$invalid);
					$scope.purchaseForm.errorMessages.push('Please provide a valid APR between 0% and 100%.');
				}

				$scope.purchaseForm.total = $scope.purchaseForm.total || {};
				$scope.purchaseForm.total.$invalid = false;
				var total = parseFloat($scope.temporaryFormValues.purchase.cashDown || 0) + parseFloat($scope.temporaryFormValues.purchase.tradeInValue || 0) + parseFloat($scope.temporaryFormValues.purchase.owedOnTradeIn || 0);
				if ($scope.currentModel && (total > $scope.currentModel.totalMsrpInt)) {
					$scope.purchaseForm.cashDown.$invalid      = true;
					$scope.purchaseForm.tradeInValue.$invalid  = true;
					$scope.purchaseForm.owedOnTradeIn.$invalid = true;
					$scope.purchaseForm.total.$invalid = true;
					$scope.purchaseForm.$valid         = ($scope.purchaseForm.$valid && !$scope.purchaseForm.total.$invalid);
					$scope.purchaseForm.errorMessages.push('The amount entered exceeds the value of the car or results in a negative monthly payment');
				}

				return $scope.purchaseForm.$valid;
			},

			_recalculate: function(args) {
				var forceRecalculation = (args && args.forceRecalculation);
				var closeModal         = (args && args.closeModal);
				var userInput          = (args && args.userInput);
				var updateAPR          = (args && args.updateAPR);
				var updateCreditScore  = (args && args.updateCreditScore);
				var paymentMethod      = $scope.paymentCalculator.paymentMethod;

				if (args && args.paymentMethod) {
					paymentMethod = args.paymentMethod;
				}

				if (!updateCreditScore) {
					var validation_lease    = $scope.form._validation_lease();
					var validation_purchase = $scope.form._validation_purchase();

					if ((paymentMethod==='lease' && !validation_lease) || (paymentMethod==='purchase' && !validation_purchase)) {
						if (closeModal) {
							utils.omnitureFireTag('792.68', {error_message:'an error occurred'});
						}
						return;
					}
				}

				$scope.paymentCalculator.loading = true;
				$scope.paymentCalculator.error   = false;

				if ($scope.currentDealer && $scope.currentModel) {
					if (utils.isPesApp()) {
						console.log('user', angular.copy($scope.user));
						console.log('currentModel', angular.copy($scope.currentModel));
						console.log('currentDealer', angular.copy($scope.currentDealer));
					}

					$scope.paymentCalculator.paymentCalculatorHook({
						currentDealer:       $scope.currentDealer,
						currentModel:        $scope.currentModel,
						selectedAccessories: $scope.selectedAccessories,
						passedFormValues:    $scope.form.formatValues($scope.temporaryFormValues),
						forceRecalculation:  forceRecalculation,
						updateAPR:           updateAPR,
						userInput:           userInput,
						paymentMethod:       paymentMethod,
					}, function (paymentEstimatorData) {
						if(!$scope.$$phase) {
							$scope.$apply(function() {
								$scope.form._apply(paymentMethod, paymentEstimatorData, args);
							});
						} else {
							$scope.form._apply(paymentMethod, paymentEstimatorData, args);
						}
					});
				}
			},

			_apply: function(paymentMethod, paymentEstimatorData, args) {
				var forceRecalculation  = (args && args.forceRecalculation);
				var closeModal          = (args && args.closeModal);
				var updateAPR           = (args && args.updateAPR);
				var firstRequest        = (args && args.firstRequest);
				var changePaymentMethod = (args && args.changePaymentMethod);

				updateAPR = updateAPR && ($scope.temporaryFormValues && $scope.temporaryFormValues.purchase && $scope.temporaryFormValues.purchase.creditScore!=='modified');

				if (paymentEstimatorData && paymentEstimatorData.success) {
					// Update APR value if different
					if ((updateAPR || firstRequest) && paymentMethod==='purchase' && paymentEstimatorData.paymentDetails[paymentMethod] && paymentEstimatorData.paymentDetails[paymentMethod].aprValue) {
						if (paymentEstimatorData.paymentDetails[paymentMethod].aprValue > 0.01) {
							$scope.temporaryFormValues[paymentMethod].estimatedAPR = angular.copy(paymentEstimatorData.paymentDetails[paymentMethod].aprValue);
						}

						$scope.paymentCalculator.paymentValues                             = $scope.paymentCalculator.paymentValues || {};
						$scope.paymentCalculator.paymentValues[paymentMethod]              = $scope.paymentCalculator.paymentValues[paymentMethod] || {};
						$scope.paymentCalculator.paymentValues[paymentMethod].estimatedAPR = $scope.temporaryFormValues[paymentMethod].estimatedAPR;
					}
					// Recalculate purchase values if credit-score is changed in Lease
					if (updateAPR && paymentMethod==='lease') {
						$scope.paymentCalculator.paymentMethod = 'purchase';
						$scope.form.recalculate({
							paymentMethod:       'purchase',
							updateAPR:           true,
							changePaymentMethod: 'lease',
						});
						$scope.paymentCalculator.paymentMethod = 'lease';
					}

					// Auto-populate cash-down value on first load
					if (firstRequest && (paymentEstimatorData.paymentValues[paymentMethod] && paymentEstimatorData.paymentValues[paymentMethod].cashDown)) {
						$scope.temporaryFormValues[paymentMethod].cashDown = paymentEstimatorData.paymentValues[paymentMethod].cashDown;
					}

					if (!updateAPR || firstRequest) {
						$scope.paymentCalculator.formValues = angular.copy($scope.form.formatValues($scope.temporaryFormValues));

						$scope.temporaryPaymentValues                          = paymentEstimatorData.paymentValues;
						$scope.temporaryPaymentValuesFormatted                 = $scope.form.formatValues($scope.temporaryPaymentValues);
						$scope.paymentCalculator.paymentValues[paymentMethod]  = $scope.temporaryPaymentValuesFormatted[paymentMethod];
						$scope.paymentCalculator.paymentDetails[paymentMethod] = paymentEstimatorData.paymentDetails[paymentMethod];
						$scope.paymentCalculator.feesAndTaxes[paymentMethod]   = paymentEstimatorData.feesAndTaxes[paymentMethod];

						$scope.paymentValues[paymentMethod]  = angular.copy($scope.temporaryPaymentValuesFormatted[paymentMethod]);
					}

					// Update form APR if different from payment values
					if ($scope.temporaryFormValues && $scope.temporaryFormValues[paymentMethod] && $scope.paymentCalculator.paymentValues && $scope.paymentCalculator.paymentValues[paymentMethod] && $scope.paymentCalculator.paymentValues[paymentMethod].estimatedAPR && $scope.temporaryFormValues[paymentMethod].estimatedAPR!==$scope.paymentCalculator.paymentValues[paymentMethod].estimatedAPR) {
						$scope.temporaryFormValues[paymentMethod].estimatedAPR = angular.copy($scope.paymentCalculator.paymentValues[paymentMethod].estimatedAPR);
					}

					if (closeModal) {
						$scope.cancel();
						if (utils.isBysApp()) {
							utils.omnitureFireTag('792.71');
						}
					}
					if (!forceRecalculation) {
						$scope.paymentCalculator.submitForm();
					}
					if (utils.isBysApp()) {
						$scope.currentModel = bysApi.getCurrentModel(true);
					}
					// if (utils.isPesApp() || (!utils.isPesApp() && closeModal)) {
					// 	$scope.defaultUIFormValues = angular.copy($scope.temporaryFormValues);
					// }

					// Hack to force-hide the keyboard on mobile
					// $scope.hideKeyboard();
				} else {
					if (paymentMethod==='lease' && paymentEstimatorData.errorMsg) {
						$scope.leaseForm.errorMessages = [paymentEstimatorData.errorMsg];
					} else if (paymentMethod==='purchase' && paymentEstimatorData.errorMsg) {
						$scope.purchaseForm.errorMessages = [paymentEstimatorData.errorMsg];
					} else {
						$scope.paymentCalculator.error = true;
					}

					if (closeModal) {
						utils.omnitureFireTag('792.68', {error_message:'an error occurred'});
					}
				}

				if (changePaymentMethod) {
					$scope.paymentCalculator.paymentMethod = changePaymentMethod;
				}
				$scope.paymentCalculator.loading = false;
			}
		};

		$scope.cancel = function () {
			if (!($scope.leaseForm && $scope.leaseForm.errorMessages && $scope.leaseForm.errorMessages.length) && !($scope.purchaseForm && $scope.purchaseForm.errorMessages && $scope.purchaseForm.errorMessages.length)) {
				$('#customize-payments').modal('hide');
				$scope.form.reset();
			}
		};

		$scope.showTab = function (e, paymentMethod) {
			e.preventDefault();

			if (!$scope.paymentCalculator.loading) {
				// On select, paymentMethod is immediately updated, without having to "apply changes"
				$scope.paymentCalculator.paymentMethod = paymentMethod;

				if (!$scope.paymentCalculator || !$scope.paymentCalculator.paymentValues || !$scope.paymentCalculator.paymentValues[paymentMethod] || Object.keys($scope.paymentCalculator.paymentValues[paymentMethod]).length<4) {
					$scope.form.recalculate({
						paymentMethod: paymentMethod
					});
				} else if (!$scope.paymentValues || !$scope.paymentValues[paymentMethod] || Object.keys($scope.paymentValues[paymentMethod]).length<4) {
					$scope.paymentValues[paymentMethod] = $scope.paymentCalculator.paymentValues[paymentMethod];
				}
				if (utils.isBysApp()) {
					$scope.currentModel = bysApi.getCurrentModel(true);
				}
			}
		};

		$scope.selectRebate = function (paymentMethod, rebate) {
			if (rebate==='collegeRebate' && $scope.temporaryFormValues[paymentMethod].collegeRebate) {
				if ($scope.isModalView && $scope.showDetails) {
					utils.omnitureFireTag('792.66', {rebate_type:'college graduate'});
				} else if ($scope.isModalView && !$scope.showDetails) {
					utils.omnitureFireTag('798.39', {rebate_type:'college graduate'});
				} else {
					utils.omnitureFireTag('799.6', {rebate_type:'college graduate'});
				}

				$scope.temporaryFormValues[paymentMethod].militaryRebate = false;
			}
			if (rebate==='militaryRebate' && $scope.temporaryFormValues[paymentMethod].militaryRebate) {
				if ($scope.isModalView && $scope.showDetails) {
					utils.omnitureFireTag('792.66', {rebate_type:'military'});
				} else if ($scope.isModalView && !$scope.showDetails) {
					utils.omnitureFireTag('798.39', {rebate_type:'military'});
				} else {
					utils.omnitureFireTag('799.6', {rebate_type:'military'});
				}

				$scope.temporaryFormValues[paymentMethod].collegeRebate = false;
			}

			$scope.synchronizeForms(paymentMethod);
		};

		$scope.selectTransmission = function (model) {
			model = model || {};

			$scope.currentModel.modelCode        = model.modelCode;
			$scope.currentModel.title            = model.year + ' ' + model.transmission;
			$scope.currentModel.msrp             = model.msrp;
			$scope.currentModel.msrpInt          = utils.formatCurrencyToNumber(model.msrp);
			$scope.currentModel.totalMsrpInt     = utils.formatCurrencyToNumber(model.msrp);
			$scope.currentModel.transmission     = utils.getTransmission(model.transmission);
			$scope.currentModel.transmissionText = utils.getTransmission(model.transmission, true);

			$scope.initialize();
		};

		// Change credit score to "modified" if APR is changed
		$scope.resetCreditScore = function() {
			$scope.temporaryFormValues.purchase.creditScore = 'modified';
			$scope.synchronizeForms('purchase');
		};

		// Update form UI since the form submission is not done via the form button, but an external button
		$scope.updateFormUI = function(formUI, formData) {
			if (formUI==='leaseFormUI') {
				$scope.temporaryFormValues.lease.cashDown      = $scope.formatUIValues(formData.cashDown.$$rawModelValue, {allowNegative:true});
				$scope.temporaryFormValues.lease.tradeInValue  = $scope.formatUIValues(formData.tradeInValue.$$rawModelValue);
				$scope.temporaryFormValues.lease.owedOnTradeIn = $scope.formatUIValues(formData.owedOnTradeIn.$$rawModelValue);
				$scope.leaseFormUI = formData;
			}
			if (formUI==='purchaseFormUI') {
				// $scope.temporaryFormValues.purchase.estimatedAPR  = $scope.formatUIValues(formData.estimatedAPR.$$rawModelValue, {allowDecimal:true});
				$scope.temporaryFormValues.purchase.cashDown      = $scope.formatUIValues(formData.cashDown.$$rawModelValue);
				$scope.temporaryFormValues.purchase.tradeInValue  = $scope.formatUIValues(formData.tradeInValue.$$rawModelValue);
				$scope.temporaryFormValues.purchase.owedOnTradeIn = $scope.formatUIValues(formData.owedOnTradeIn.$$rawModelValue);
				$scope.purchaseFormUI = formData;
			}
		};

		// Format form values as user types them in
		$scope.formatUIValues = function(value, args) {
			if (args && args.allowNegative && ((value+'').match(/-/g) || []).length===1) {
				return value;
			}
			if (args && args.allowDecimal && ((value+'').match(/\./g) || []).length===1) {
				return value;
			}
			return parseFloat(value);
		};

		// Synchronize forms for some specific items
		$scope.synchronizeForms = function(paymentMethod, attribute) {
			var formValues = $scope.temporaryFormValues[paymentMethod];

			for (var tempPaymentMethod in $scope.temporaryFormValues) {
				if (tempPaymentMethod===paymentMethod && angular.isObject($scope.temporaryFormValues[tempPaymentMethod])) {
					$scope.temporaryFormValues[tempPaymentMethod].netTradeInValue = $scope.temporaryFormValues[tempPaymentMethod].tradeInValue - $scope.temporaryFormValues[tempPaymentMethod].owedOnTradeIn;
				}
			}

			for (var tempPaymentMethod in $scope.temporaryFormValues) {
				if (tempPaymentMethod!==paymentMethod && angular.isObject($scope.temporaryFormValues[tempPaymentMethod])) {
					$scope.temporaryFormValues[tempPaymentMethod].militaryRebate = false;
					$scope.temporaryFormValues[tempPaymentMethod].collegeRebate  = false;

					for (var key in $scope.temporaryFormValues[tempPaymentMethod]) {
						if (formValues[key] && (key==='owedOnTradeIn' || key==='tradeInValue' || key==='militaryRebate' || key==='collegeRebate')) {
							$scope.temporaryFormValues[tempPaymentMethod][key] = formValues[key];
						}
						if (formValues[key] && (key==='creditScore')) {
							$scope.temporaryFormValues[tempPaymentMethod][key] = (formValues[key]!=='modified') ? formValues[key] : 'excellent';
						}
					}
					$scope.temporaryFormValues[tempPaymentMethod].netTradeInValue = $scope.temporaryFormValues[tempPaymentMethod].tradeInValue - $scope.temporaryFormValues[tempPaymentMethod].owedOnTradeIn;
				}
			}

			var forceRecalculation = Boolean(attribute);
			if (attribute && attribute==='termDuration') {
				if ($scope.temporaryFormValues.purchase && $scope.temporaryFormValues.purchase.creditScore==='modified') {
					forceRecalculation = false;
				}
			}

			if (forceRecalculation) {
				$scope.form.recalculate({
					paymentMethod:     paymentMethod,
					updateAPR:         true,
					updateCreditScore: true,
				});
			}
		};

		// $scope.hideKeyboard = function() {
		// 	if (!utils.isDeviceDesktop()) {
		// 		document.activeElement.blur();
		// 		var selects = document.querySelectorAll('select');
		// 		for(var i=0; i < selects.length; i++) {
		// 			selects[i].blur();
		// 		}
		// 	}
		// };

		$scope.contactDealer = function() {
			$window.open(config.getConsumerEndpoint('dealersLink'), '_blank');
		};

		$scope.submitZipCode = function() {
			var zipCode = $scope.data.zipCode;

			if (zipCode===undefined || isNaN(zipCode)) {
				$scope.formErrors = ['Please enter only numbers.'];
				return;
			} else if (!zipCode) {
				$scope.formErrors = ['This field is required.'];
				return;
			} else if (zipCode.length<5) {
				$scope.formErrors = ['Please enter at least 5 characters.'];
				return;
			} else if (zipCode.length>5) {
				$scope.formErrors = ['Please enter no more than 5 characters.'];
				return;
			}

			var updateZipCode = function(args) {
				// Store new zip-code in cookies
				consumer.setZipCode(zipCode);
				// Broadcast new zip-code everywhere
				consumer.getZipCode({forceCookies:true});
				// Disregard previous selected dealer
				bysCookies.dealerCode.update(false);

				$scope.initialize();

				$('#zipcode-modal').modal('hide');
			};

			// Check if zip-code is valid against DIS API
			var deregisterCallback = $rootScope.$on('updateRegion', function(event, data) {
				// If region is different, throw a warning, and wait for confirmation
				if (data.redirect) {
					$scope.formErrors = ['The zip code you entered is not currently supported.', 'Please re-enter your zip code.', 'Or to find a dealer in '+data.redirect.title+', click here:', data.redirect.link];
				} else if (data.success) {
					updateZipCode();
				} else {
					$scope.formErrors = ['The zip code you entered is invalid, or not supported.','Please try again'];
				}
				$scope.data.isFormSubmitting = false;
				deregisterCallback();
			});
			$scope.data.isFormSubmitting = true;
			consumer.getRegion(zipCode);
		};

		$rootScope.$on('pesServiceUpdate', $scope.initializePesService);

		var deregisterCallbackPesService = $rootScope.$on('pesServiceUpdate', $scope.updateCurrentModel);

		// var deregisterCallbackPesService = $rootScope.$on('pesServiceReady', $scope.initializePesService);

		var deregisterCallbackReady = $rootScope.$on('customizePaymentsReady', function(event, data) {
			$scope.customizePaymentsReady = true;
		});

		if ($scope.paymentCalculator.isReady) {
			$scope.form.reset();
		} else {
			$scope.$on('paymentCalculatorReady', $scope.form.reset);
		}

		if ($scope.paymentCalculator.isLoaded) {
			paymentCalculatorReady();
		} else {
			$rootScope.$on('paymentCalculatorReady', paymentCalculatorReady);
		}

	})
	.directive('cleanClasses', function (utils) {
		return {
			link: function(scope, element) {
				if (utils.isDeviceDesktop()) {
					element.find('span').removeClass('btn').removeClass('btn-default');
				}
			}
		};
	});
