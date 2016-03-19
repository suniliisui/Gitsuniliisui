'use strict';

angular.module('invApp')
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
			.state('summary', {
				url: '^/summary',
				templateUrl: '../modules/summary/summaryTemplate.html',
				controller: 'SummaryController'
			})
			.state('inventory', {
				abstract: true,
				templateUrl: '../modules/inventory/inventoryTemplate.html',
				controller: 'InventoryController'
			})
			.state('inventory.results', {
				url: '^/results',
				templateUrl: '../modules/inventory/results/resultsTemplate.html',
				controller: 'ResultsController'
			})
			.state('inventory.upgrades', {
				url: '^/upgrades',
				templateUrl: '../modules/inventory/upgrades/upgradesTemplate.html',
				controller: 'UpgradesController'
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

angular.module('invApp').run(['$rootScope', function ($rootScope) {
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
