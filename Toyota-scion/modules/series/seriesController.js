'use strict';

angular.module('selectModule')
	.controller('SeriesController', function ($scope, utils) {
		$scope.$root             = $scope.$root|| {};
		$scope.$root.sectionName = 'series';
		$scope.utils = utils;
	});
