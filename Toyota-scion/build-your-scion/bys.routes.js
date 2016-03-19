'use strict';

angular.module('bysApp')
	.config(function ($stateProvider, $locationProvider) {
		$stateProvider
			.state('select', {
				abstract: true,
				templateUrl: '../modules/select/selectTemplate.html',
				controller: 'SelectController'
			})
			.state('select.series', {
				url: '^/series',
				templateUrl: '../modules/select/series/seriesTemplate.html',
				controller: 'SeriesController'
			})
			.state('select.model', {
				url: '^/models',
				templateUrl: '../modules/select/model/modelTemplate.html',
				controller: 'ModelController'
			})
			.state('configuration', {
				abstract: true,
				templateUrl: '../modules/configuration/configurationTemplate.html',
				controller: 'ConfigurationController'
			})
			.state('configuration.transmission', {
				url: '^/transmission',
				templateUrl: '../modules/configuration/transmission/transmissionTemplate.html',
				controller: 'TransmissionController'
			})
			.state('configuration.color', {
				url: '^/color',
				templateUrl: '../modules/configuration/color/colorTemplate.html',
				controller: 'ColorController'
			})
			.state('configuration.spoiler', {
				url: '^/spoiler',
				templateUrl: '../modules/configuration/spoiler/spoilerTemplate.html',
				controller: 'SpoilerController'
			})
			.state('configuration.wheels', {
				url: '^/wheels',
				templateUrl: '../modules/configuration/wheels/wheelsTemplate.html',
				controller: 'WheelsController'
			})
			.state('configuration.audio', {
				url: '^/audio',
				templateUrl: '../modules/configuration/audio/audioTemplate.html',
				controller: 'AudioController'
			})
			.state('configuration.accessories', {
				url: '^/accessories',
				templateUrl: '../modules/configuration/accessories/accessoriesTemplate.html',
				controller: 'AccessoriesController'
			})
			.state('configuration.packages', {
				url: '^/packages',
				templateUrl: '../modules/configuration/packages/packagesTemplate.html',
				controller: 'PackagesController'
			})
			.state('configuration.serviceandprotection', {
				url: '^/service-and-protection',
				templateUrl: '../modules/configuration/serviceandprotection/serviceandprotectionTemplate.html',
				controller: 'ServiceAndProtectionController'
			})
			.state('summary', {
				url: '^/summary',
				templateUrl: '../modules/summary/summaryTemplate.html',
				controller: 'SummaryController'
			})
			.state('dealer', {
				abstract: true,
				templateUrl: '../modules/dealer/dealerTemplate.html',
				controller: 'DealerController'
			})
			.state('dealer.select', {
				url: '^/find-dealer',
				templateUrl: '../modules/dealer/select/dealerSelectTemplate.html',
				controller: 'DealerSelectController'
			})
			.state('dealer.contact', {
				url: '^/contact-dealer',
				templateUrl: '../modules/dealer/contact/dealerContactTemplate.html',
				controller: 'DealerContactController'
			})
			.state('dealer.confirmation', {
				url: '^/contact-dealer-confirmation',
				templateUrl: '../modules/dealer/confirmation/dealerConfirmationTemplate.html',
				controller: 'DealerConfirmationController'
			})
			.state('apply', {
				abstract: true,
				templateUrl: '../modules/apply/applyTemplate.html',
				controller: 'ApplyController'
			})
			.state('apply.step1', {
				url: '^/apply-for-credit-step1',
				templateUrl: '../modules/apply/step1/apply1Template.html',
				controller: 'Apply1Controller'
			})
			.state('apply.step2', {
				url: '^/apply-for-credit-step2',
				templateUrl: '../modules/apply/step2/apply2Template.html',
				controller: 'Apply2Controller'
			});

			// Use of hashtag-bang for SEO purposes
			$locationProvider
				.html5Mode(false)
				.hashPrefix('!');
	});

angular.module('bysApp').run(['$rootScope', function ($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$rootScope.previousState = fromState.name;

			$rootScope.scrollToTop = function(delay) {
				delay = parseInt(delay) || 800;

				if ($('#mainContainer') && $('#mainContainer').offset()) {
					$('html,body').delay(delay).animate({
						scrollTop: $('#mainContainer').offset().top
					});
				}
			};

			if (toState && toState.name && toState.name.indexOf('select')<0) {
				if ($rootScope.bysApiReady) {
					$rootScope.scrollToTop(400);
				} else {
					$rootScope.$on('bysApiReady', $rootScope.scrollToTop);
				}
			} else {
				$rootScope.scrollToTop(400);
			}

		});
	}]);
