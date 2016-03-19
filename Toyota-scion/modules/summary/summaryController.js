'use strict';

angular.module('summaryModule')
	.controller('SummaryController', function ($rootScope, $scope, $timeout, $state, $location, $window, bysApi, utils, paymentCalculator, consumer, $modal) {
		$scope.$parent.section   = 'summary';
		$scope.$root             = $scope.$root|| {};
		$scope.$root.sectionName = 'summary';
		$scope.$root.pageName    = '';

		$scope.bysApi            = bysApi;
		$scope.utils             = utils;
		$scope.paymentCalculator = paymentCalculator;

		$scope.showTab = function (e, paymentMethod) {
			e.preventDefault();
			// On select, paymentMethod is immediately updated, without having to 'apply changes'
			$scope.paymentCalculator.paymentMethod = paymentMethod;
			$scope.currentModel  = $scope.bysApi.getCurrentModel(true);
			$scope.currentDealer = $scope.bysApi.getCurrentDealer();

			paymentCalculator.paymentCalculatorHook({
				currentDealer: $scope.currentDealer,
				currentModel:  $scope.currentModel,
			});

			if (utils.isBysApp()) {
				utils.omnitureFireTag('792.15', {lease_purchase:paymentMethod, cta:paymentMethod});
			}
			if (utils.isInvApp()) {
				utils.omnitureFireTag('798.22', {lease_purchase:paymentMethod, cta:paymentMethod});
			}
		};

		$scope.clickAccessory = function(accessoryCode) {
			bysApi.clickAccessory(accessoryCode, 'accessory');

			var selectedAccessories = $scope.bysApi.getSelectedAccessories();
			$scope.upgradesListCount = selectedAccessories.length || 0;

			// Removed per Hitachi's request
			// var selectedColor = $scope.bysApi.getSelectedColor(true);
			// if (selectedColor.msrpInt) {
			// 	$scope.upgradesListCount++;
			// }
		};

		$rootScope.generateEmailFormData = function() {
			// JV::ToDo -- Temp XML feed for emailing system
			var data = {};
			var applicationURL = $location.protocol() + '://' +  $location.host();
			if ($location.port()!==80) {
				applicationURL += ':' + $location.port();
			}

			// Retrieve current model data
			$scope.currentModel = $scope.bysApi.getCurrentModel();

			// Format current model for XML
			data.currentModel = {
				seriesCode:										$scope.currentModel.seriesCode || $scope.currentModel.series,
				seriesTitle:									$scope.currentModel.seriesTitle,
				modelCode:										$scope.currentModel.modelCode || $scope.currentModel.code,
				modelYear:										$scope.currentModel.modelYear || $scope.currentModel.year,
				colorCode:										$scope.currentModel.colorCode,
				colorTitle:										$scope.currentModel.colorTitle,
				colorHexValue:								$scope.currentModel.colorHexValue,
				colorsTotal:									$scope.currentModel.colorsTotalInt,
				exactMatch:										$scope.currentModel.exactMatch || false,
				groupByCount:									$scope.currentModel.groupByCount || 0,
				msrp:													$scope.currentModel.msrpInt || 0,
				upgradesWithoutSnPTotalInt:		$scope.currentModel.upgradesWithoutSnPTotalInt || 0,
				deliveryProcessingHandling:		$scope.currentModel.deliveryProcessingHandlingInt || 0,
				taxesTitleFees:								$scope.currentModel.taxesTitleFeesInt || 0,
				totalMsrp:										$scope.currentModel.totalMsrp || 0,
				transmission:									$scope.currentModel.transmissionText,
			};

			// Set current model image for XML
			data.currentModel.imageURL = (applicationURL+$scope.currentModel.carImagePath) || false;

			// Retrieve current dealer data
			$scope.currentDealer = $scope.bysApi.getCurrentDealer();

			// Format current dealer for XML
			if ($scope.currentDealer.region) {
				data.currentDealer = {
					region:  $scope.currentDealer.region,
					title:   $scope.currentDealer.title,
					address: $scope.currentDealer.address,
					contact: $scope.currentDealer.contact,
					isPPP:   $scope.currentDealer.isPPP,
				};
			}

			// Format payments estimator for XML
			data.paymentCalculator = {
				paymentMethod:	$scope.paymentCalculator.paymentMethod,
				formValues:			$scope.paymentCalculator.formValues,
				paymentValues:	$scope.paymentCalculator.paymentValues,
				// feesAndTaxes:	  $scope.paymentCalculator.feesAndTaxes,
			};

			// Format standard features for XML
			data.standardFeaturesList = angular.copy($scope.standardFeaturesList);

			// Format preinstalled accessories for XML
			data.preinstalledList = $scope.preinstalledList;

			// Format upgrades for XML
			data.upgradesList = {};
			for (var accessoryCode in $scope.upgradesList) {
				var accessory = $scope.upgradesList[accessoryCode];

				if (accessory.group) {
					data.upgradesList[accessory.group] = data.upgradesList[accessory.group] || {};
					data.upgradesList[accessory.group][accessoryCode] = {
						code:						accessoryCode,
						// id:							accessory.id,
						// type:						accessory.type,
						title:					accessory.title,
						msrp:						accessory.msrpInt,
						thumbImage:			accessory.thumbImage || {},
						group:					accessory.group,
						subGroup:				accessory.subGroup,
						// favorite:				accessory.favorite,
						// priceDisclaimerCodes:	accessory.priceDisclaimerCodes,
					};
				}
			}

			// List of links
			data.links = {
				pppLogo:    (applicationURL+'/bys-content/img/ppp-logo.png'),
				summary:    $location.absUrl(),
				findDealer: $location.absUrl().replace($location.path(), 'find-dealer'),
				dealers:    $location.absUrl().replace('/build-your-scion', '/inventory').replace($location.path(), 'results')
			};

			// List of disclaimers
			data.disclaimers = [];

			return data;
		};

		$scope.collapsePreinstalled = false;
		$scope.collapseUpgrades	 = false;
		$scope.collapseStandard	 = true;
		$scope.collapseList	 = true;

		$scope.onBysApiReady = function() {
			// Retrieve current model data
			$scope.currentModel = $scope.bysApi.getCurrentModel(true);

			// Total count of images in image
			$scope.galleryCount = $scope.bysApi.getThreedTotalCount();

			// Update viewable content
			$scope.showPaymentItems   = Boolean(bysApi.getRegion()!=='SET' && paymentCalculator.paymentValues);
			$scope.showInventoryItems = Boolean(bysApi.getRegion()!=='SET' && bysApi.getRegion()!=='GST');

			// Selected color
			$scope.selectedColor = $scope.bysApi.getSelectedColor(true);
			// Pre-installed
			$scope.preinstalledList = {};
			$scope.preinstalledListCount = 0;
			// Upgrades
			$scope.upgradesList = {};
			$scope.upgradesListCount = 0;
			$scope.upgradesTitleList = [];

			// Retrieve list of preinstalled accessories (from inventory)
			var preinstalledAccessoriesList = $scope.currentModel.preinstalledAccessories || [];
			for (var i = 0; i < preinstalledAccessoriesList.length; i++) {
				var accessory = preinstalledAccessoriesList[i];

				// Retrieve accessory thumbnail from EFC API
				var efcAccessory = $scope.bysApi.getAccessory(accessory.code);
				if (efcAccessory) {
					accessory.thumbImage = efcAccessory.thumbImage;
				}

				$scope.preinstalledListCount++;
				$scope.preinstalledList[accessory.code] = accessory;
			}

			// Retrieve list of selected accessories
			var selectedAccessoriesList = $scope.bysApi.getSelectedAccessories(true);
			for (var group in selectedAccessoriesList) {
				var groupData = selectedAccessoriesList[group];
				for (var accessoryCode in groupData.accessories) {
					if (!$scope.preinstalledList || !$scope.preinstalledList[accessoryCode]) {
						$scope.upgradesListCount++;
						$scope.upgradesList[accessoryCode] = groupData.accessories[accessoryCode];
						$scope.upgradesTitleList.push($scope.upgradesList[accessoryCode].title);
					}
				}
			}

			// Inventory specific items
			if (utils.isInvApp()) {
				utils.omnitureFireTag('798.18', {upgrades_summary:$scope.upgradesTitleList.join(',')});

				$scope.matchesCount = $scope.currentModel.groupByCount;
				$scope.bysApi.refreshUrlParameters();
			}

			// Configuration specific items
			if (utils.isBysApp()) {
				utils.omnitureFireTag('792.20', {summary_list:$scope.upgradesTitleList.join(',')});
			}

			// Determine to show list of pre-installed
			if ($scope.preinstalledListCount>0) {
				$scope.dislayIncludedList = true;
			}
			// Determine to show list of upgrades
			if ($scope.upgradesListCount>0) {
				$scope.dislayUpgradesList = true;
			}

			// Retrieve list of features
			var deregisterCallback = $scope.$on('standardFeaturesReady', function(event, data) {
				if (data.features) {
					$scope.standardFeaturesList = data.features;
					$scope.standardFeaturesListCount = 0;

					for (var group in $scope.standardFeaturesList) {
						var groupData = $scope.standardFeaturesList[group];
						$scope.standardFeaturesListCount += groupData.items.length;
					}
				}

				deregisterCallback();
			});

			var series = ($scope.currentModel.modelTitle || $scope.currentModel.seriesTitle).split(' ');
			consumer.getListFeatures(series[0], $scope.currentModel.year);

			// Implicitly call $scope.$apply as soon as current $digest cycle is over
			$timeout();
		};

		$scope.gotoInventory = function () {
			$window.location.href = $location.absUrl().replace('/build-your-scion', '/inventory').replace($location.path(), 'results');
		};

		// Update total MSRP everytime the price has been updated
		$scope.$watchCollection('bysApi.currentModel', function() {
			if ($scope.bysApi.isReady()) {
				$scope.totalMsrpCurrency = bysApi.currentModel.totalMsrpCurrency;
			}
		});

		// Update viewable content when paymentCalculator is ready
		$scope.$watchCollection('paymentCalculator.paymentValues', function() {
			if ($scope.bysApi.isReady()) {
				$scope.currentModel       = bysApi.getCurrentModel(true);
				$scope.showPaymentItems   = Boolean(bysApi.getRegion()!=='SET' && paymentCalculator.paymentValues);
				$scope.showInventoryItems = Boolean(bysApi.getRegion()!=='SET' && bysApi.getRegion()!=='GST');

				// Recalculate payment details if needed
				if (bysApi.isReady() && Object.keys(paymentCalculator.getPaymentDetails()).length<2) {
					// bysApi.calculatePaymentEstimator();
				}
			}
		});

		if ($scope.bysApi.isReady()) {
			$scope.onBysApiReady();
		} else {
			$scope.$on('bysApiReady', $scope.onBysApiReady);
		}

		// If some parameters are missing to initialize EFC
		$scope.$on('bysApiError', function() {
			$state.go('select.series');
		});

		// Carousel Control
		$scope.carouselLeft = true;
		$scope.carouselRight = true;
		$scope.carouselPosition = 1;
		$scope.carouselButtons = function () {
			var containerWidth = $('.carousel-wrapper').width(),
				carouselWidth = $('.carousel-wrapper > .row').width(),
				offset = parseInt($('.carousel-wrapper').css('left')),
				items = $('.carousel-wrapper > .row > div').length;

				$scope.carouselCount = items;
			offset = Math.round((Math.abs(offset) / containerWidth) * 100);
			// show/hide arrow button
			if (items >= 2 && ((items - 2) * 50 > offset)) {
				$scope.carouselRight = true;
			} else {
				$scope.carouselRight = false;
			}
			
			if (offset > 0) {
				$scope.carouselLeft = true;
			} else {
				$scope.carouselLeft = false;
			}
		};
		$scope.shiftCarousel = function (direction) {
			if($('.carousel-wrapper > .row:animated').length > 0 || (direction === 'right' && !$scope.carouselRight) || (direction === 'left' && !$scope.carouselLeft)) {
				return false;
			}
			var containerWidth = $('.carousel-wrapper').width(),
					offset = parseInt($('.carousel-wrapper > .row').css('left'));
			offset = parseInt(((offset < 0) ? '-' : '') + Math.round((Math.abs(offset) / containerWidth) * 100));

			if (direction === 'left') {
				offset += 100;
				$scope.carouselPosition--;
			} else {
				offset -= 100;
				$scope.carouselPosition++;
			}

			$('.carousel-wrapper > .row').animate({
			    left: offset + '%'
			}, 500);
		};
		/*
		$(window).scroll(function () {
			var wstCrnt = 150-($(window).scrollTop());
			var newTop = 10;
			if (wstCrnt > 0) {
				$('.summary-sidebar').css({'top': wstCrnt});
			}else{$('.summary-sidebar').css({'top': '10px'});}
		});
		*/
	});
