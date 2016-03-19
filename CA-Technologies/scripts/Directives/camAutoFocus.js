'use strict';

/**
 * Created by trisu03 on 2/17/2015.
 */
(function () {
  angular.module('camuiApp')
    .directive('camAutoFocus', function($timeout, $parse) {
      return {
        link: function(scope, element, attrs) {
          var model = $parse(attrs.camAutoFocus);
          scope.$watch(model, function(value) {
            if(value === true) {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
          element.bind('blur', function() {
            scope.$apply(model.assign(scope, false));
          });
        }
      };
    });
})();
