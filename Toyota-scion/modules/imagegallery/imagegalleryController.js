'use strict';

angular.module('configurationModule')
	.controller('ImageGalleryController', function ($scope, bysApi, utils) {

		$scope.$watchCollection('bysApi.threedMainImagePath', function() {
			$scope.mainImagePath = bysApi.getThreedMainImagePath();
		});

	});
