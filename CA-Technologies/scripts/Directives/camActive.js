'use strict';

(function () {
  angular.module('camuiApp')
    .directive('camActive', ['$rootScope','$location', function ($rootScope, $location) {
      return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
          //after the route has changed
          scope.$on('$routeChangeSuccess', function () {
            var hrefs = [$rootScope.BaseURL + '/#' + $location.path(),
              $rootScope.BaseURL + '#' + $location.path(), //html5: false
              $rootScope.BaseURL + $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
              a = angular.element(a);
              if (-1 !== hrefs.indexOf(a.attr('href'))) {
                a.parent().addClass('active');
              } else {
                a.parent().removeClass('active');
              }
            });
          });
        }
      };
    }]);
})();
