'use strict';

angular.module('footerModule')
	.controller('FooterController', function ($scope, $modal, bysCookies, consumer, utils) {
		$scope.utils = utils;

		$scope.openZipCodeModal = function() {
			// If no zip-code has been provided by the user, force him/her to do so
			if (!consumer.getZipCode() && !utils.zipCodeActive) {
				var deregisterCallback = $scope.$on('updateZipCode', function(event, data) {
					if(!utils.isPesApp() && !utils.isRegApp()) {
						utils.zipCodeActive = true;
						var modalInstance = $modal.open({
							controller: 'ModalController',
							templateUrl: '../modules/common/zipcodeModalTemplate.html',
							size: 'md',
							backdrop: 'static',
							resolve: {
								data: function () {
									return {
										preventDefault: true,
										zipCode: data,
										forceClose: true
									};
								}
							}
						});
					} else {
						$('#zipcode-modal').modal();
					}

					deregisterCallback();
				});
				consumer.getZipCode();
			}
		};

		// Check if cookies are enabled
		var vehiclePrefs = bysCookies.vehiclePrefs.get();
		if (!vehiclePrefs || !vehiclePrefs.cookiesEnabled) {
			vehiclePrefs = vehiclePrefs || {};
			vehiclePrefs.cookiesEnabled = true;

			bysCookies.vehiclePrefs.update(vehiclePrefs);
			vehiclePrefs = bysCookies.vehiclePrefs.get();
		}

		if (!vehiclePrefs || !vehiclePrefs.cookiesEnabled) {
			var errorMsg = ['This site uses cookies to store information on your computer to allow for a better, quicker experience. It even allows you to save your favorites.'];
			utils.throwError(errorMsg, {
				custom: function() {
					$scope.openZipCodeModal();
				}
			}, {
				title: 'Enable Your Browser\'s Cookies',
				size: 'lg',
				buttonsText: {
					custom: 'I\'m cool with this'
				}
			});
		} else {
			$scope.openZipCodeModal();
		}
	});
