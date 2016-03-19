'use strict';
/**
 * Created by sorko01 on 2/26/2015.
 */

(function () {
  angular.module('camuiApp').directive('timeoutPopover',
  ['$timeout',function($timeout){
    return {
      restrict: 'A',
      link: function(scope, elm/*, attr*/){
        elm.bind('mouseover', function () {
          $timeout(function(){
            elm.find('.popover').css({visibility: 'hidden'});
          },5500);
        });
      }
    };
  }]);
})();

