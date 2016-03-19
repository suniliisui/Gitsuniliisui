'use strict';

/**
 * Created by trisu03 on 2/12/2015.
 */
(function () {
  angular.module('camuiApp')
    .directive('camUppercase', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (input) {
          return input ? input.toUpperCase() : '';
        });
        $(element).css('text-transform', 'uppercase');
      }
    };
  });
})();
