'use strict';

/**
 * @ngdoc service
 * @name camuiApp.enginesSvc
 * @description
 * # enginesSvc
 * Service in the camuiApp.
 */
angular.module('camuiApp')
  .service('enginesSvc', function (apiSvc, $location) {
    this.getEngines = function (engineType) {
      if (angular.isString(engineType)) {
        return apiSvc.get('http://' + $location.host() + ':8080/cam/engines', {type: engineType});
      } else {
        return apiSvc.get('http://' + $location.host() + ':8080/cam/engines');
      }
    };
    this.addScheduler = function (scheduler) {
      return apiSvc.post('http://' + $location.host() + ':8080/cam/engines', scheduler);
    };
    this.validateScheduler = function (scheduler) {
      return apiSvc.post('http://' + $location.host() + ':8080/cam/engines/validate', scheduler);
    };
    this.updateScheduler = function (scheduler) {
      return apiSvc.put('http://' + $location.host() + ':8080/cam/engines/' + scheduler.name, scheduler);
    };
    this.deleteScheduler = function (scheduler) {
      return apiSvc.delete('http://' + $location.host() + ':8080/cam/engines/' + scheduler.name);
    };
  });
