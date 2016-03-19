'use strict';

/*jslint evil: true */
angular.module('headerModule')
	.controller('HeaderController', function ($scope, config, utils, bysCookies) {
		$scope.$root                 = $scope.$root|| {};
		$scope.$root.sectionName     = '';
		$scope.$root.pageName        = '';
		$scope.$root.browserName     = utils.getBrowser() ? ('browser-'+utils.getBrowser()) : '';
		$scope.$root.backgroundImage = false;

		$scope.ensightenURL = config.getConsumerEndpoint('ensighten');

		if ($scope.ensightenURL) {
			// Hack to perform a document write
			var oldDocumentWrite = document.write;
			document.write = function(node){
				$('body').append(node);
			};
			// Load external script
			$.getScript($scope.ensightenURL, function() {
				setTimeout(function() {
					document.write = oldDocumentWrite;
				}, 100);
			});
		}

		// If zip-code from URL is different than zip-code from cookies, update userZip and dealerCode cookies
		if (utils.getUrlParameter('zipCode') && utils.getUrlParameter('zipCode')!==bysCookies.userZip.get()) {
			bysCookies.userZip.update(utils.getUrlParameter('zipCode'));
			bysCookies.userState.destroy();
			bysCookies.dealerCode.destroy();
			console.log('New zip-code has been detected. Cookies are refreshed.');
		}
	});
