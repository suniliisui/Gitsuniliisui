'use strict';

angular.module('commonModule')
	.controller('ModalController', function ($rootScope, $scope, $window, $state, $modalInstance, $location, $sce, data, paymentCalculator, utils, config, bysCookies, consumer) {

		$scope.paymentCalculator = paymentCalculator;
		$scope.utils             = utils;
		$scope.data              = data;

		$scope.prevModal = $('#customize-payments');

		if (data && data.kbb) {
			$scope.kbbURL = config.getConsumerEndpoint('kbb');
			if ($scope.kbbURL) {
				$scope.kbbURL = $sce.trustAsResourceUrl($scope.kbbURL);
			}
		}

		// List of all the buttons displayable in the modal
		$scope.buttons = {
			'confirm': {
				text: 'Confirm',
				btnClass: 'btn-blue',
				callback: function() {
					$scope.confirm();
				}
			},
			'cancel': {
				text: 'Cancel',
				btnClass: 'btn-default dark',
				callback: function() {
					$scope.cancel();
				}
			},
			'close': {
				text: 'Close',
				btnClass: 'btn-default dark',
				callback: function() {
					$scope.close();
				}
			},
			'custom': {
				text: 'Custom',
				btnClass: 'btn-blue',
				callback: function() {
					$scope.custom();
				}
			},
		};

		$scope.confirm = function () {
			if ($scope.data.buttons && $scope.data.buttons.confirm) {
				$scope.data.buttons.confirm();
			}
			if (!$scope.data.preventDefault) {
				$modalInstance.close();
			}
		};

		$scope.cancel = function () {
			if ($scope.data.buttons && $scope.data.buttons.cancel) {
				$scope.data.buttons.cancel();
			}
			if (!$scope.data.preventDefault) {
				$modalInstance.dismiss('cancel');
			}
		};

		$scope.close = function () {
			if ($scope.data.buttons && $scope.data.buttons.close) {
				$scope.data.buttons.close();
			}
			$modalInstance.dismiss('cancel');
		};

		$scope.custom = function () {
			if ($scope.data.buttons && $scope.data.buttons.custom) {
				$scope.data.buttons.custom();
			}
			if (!$scope.data.preventDefault) {
				$modalInstance.close();
			}
		};

		$scope.back = function () {
			$modalInstance.close();
			$modalInstance.result.then(function () {
				$scope.prevModal.modal('show');
				$scope.prevModal.on('shown.bs.modal', function () {
					console.log('shown');
					$('body').addClass('modal-open');
				});
			});
		};

		$scope.$on('onRepeatLast', function(scope, element, attrs){
		var newPos = $('.disclaimer-list li.active').position().top - $('.disclaimer-list li:first-child').position().top;
			$('.disclaimer-list').animate({
				scrollTop: newPos
			});
		});
		$scope.activate = function (a) {
			if( $('.disclaimer-list li').eq( !a ) ){
				$('.disclaimer-list li').removeClass('active');
			}
			$('.disclaimer-list li').eq( a ).addClass('active');
		};

	})
	.directive('onLastRepeat', function() {
		return function(scope, element, attrs) {
			if (scope.$last) {
				setTimeout(function(){
					scope.$emit('onRepeatLast', element, attrs);
				}, 500);
			}
		};
	});
