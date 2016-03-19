'use strict';

/**
 * @ngdoc function
 * @name camuiApp.controller:EnginesCtrl
 * @description
 * # EnginesCtrl
 * Controller of the camuiApp
 */
(function () {
  angular.module('camuiApp')
    .controller('enginesCtrl', function ($scope, enginesSvc, $interval, $log, $modal, $timeout, $document, $q, $rootScope, $modalStack, $state) {
      $scope.tags = [];
      $scope.showme = false;
      $scope.type = $state.params.type;
      $scope.status = $state.params.engineStatus;
      $scope.upCount = $state.params.upCount;
      $scope.showme = false;
      $scope.schedulerRow = {'selected': ''};
      $scope.enginesListOptions = {
        enableSorting: true,
        enableColumnResize: true,
        showSelectionCheckbox: true,
        selectWithCheckboxOnly: true,
        enableRowSelection: false,
        headerRowHeight: 39,
        rowHeight: 39,
        filterOptions: {filterText: '', useExternalFilter: false},
        checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionRadio" value="{{row.rowIndex}}" name="scheduleSelection" type="radio" ng-click="selectScheduler(row)" ng-checked="row.rowIndex === selectedRowIndex"/></div>',
        data: 'engines',
        rowTemplate: '<div ng-class="isRowUpdated(row)" ><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div></div>',
        columnDefs: [
          {
            displayName: 'Connection',
            field: 'engineStatus',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesListConnection.html',
            width: 80
          },
          {
            displayName: 'Name',
            field: 'name',
            headerClass: 'cam-engine-list-header-column',
            cellTemplate: 'views/enginesListName.html',
            width: 164
          },
          {
            displayName: 'Type',
            field: 'type',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesList.html',
            width: 65
          },
          {
            displayName: 'Instance',
            field: 'instance',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesList.html',
            width: 65
          },
          {
            displayName: 'Agent Count',
            field: 'numberOfAgents',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesListAgentCount.html',
            width: 65
          },
          {
            displayName: 'Address',
            field: 'address',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesList.html'
          },
          {
            displayName: 'Port',
            field: 'port',
            headerClass: 'text-center cam-engine-list-header-column',
            cellTemplate: 'views/enginesListPort.html',
            width: 70,
            minWidth: 70
          }
        ]
      };

      $scope.camSchedulerData = null;
      $scope.engine = {engineStatus: true};
      $scope.engines = [];
      $scope.selected = null;
      $scope.newItemIndex = -1;
      $scope.schedulerSearchText = '';

      var setFilterText = function () {
        var parameterNames = {
          type: 'Type',
          engineStatus: 'Connection'
        };
        var connectionConversion = {
          false: '\u2197',
          true: '\u2198'
        };
        $scope.enginesListOptions.filterOptions.filterText = '';
        $scope.tags = [];
        $scope.showme = false;
        var schedulerStatus = $scope.status.toLowerCase();
        if (schedulerStatus !== 'none') {
          if (schedulerStatus === 'up') {
            $scope.up = false;
            $scope.filterText1 = $scope.up;
          } else if (schedulerStatus === 'down') {
            $scope.down = true;
            $scope.filterText1 = $scope.down;
          } else {
            $scope.up = false;
            $scope.down = false;
            $scope.filterText1 = '';
          }
        } else {
          $scope.up = false;
          $scope.down = false;
          $scope.filterText1 = '';
        }
        if ($scope.type !== 'none') {
          $scope.filterText2 = $scope.type;
        } else {
          $scope.filterText2 = '';
        }
        if ($scope.filterText1 !== '' && $scope.filterText2 !== '') {
          $scope.tags.push({text: parameterNames.engineStatus + ': ' + connectionConversion[$scope.filterText1.toString()]});
          $scope.tags.push({text: parameterNames.type + ': ' + $scope.filterText2});
          $scope.showme = true;
          $scope.enginesListOptions.filterOptions.filterText = 'engineStatus:' + $scope.filterText1 + ';' + 'type:' + $scope.filterText2;
        } else if ($scope.filterText1 !== '' && $scope.filterText2 === '') {
          $scope.tags.push({text: parameterNames.engineStatus + ': ' + connectionConversion[$scope.filterText1.toString()]});
          $scope.showme = true;
          $scope.enginesListOptions.filterOptions.filterText = 'engineStatus:' + $scope.filterText1;
        } else if ($scope.filterText1 === '' && $scope.filterText2 !== '') {
          $scope.tags.push({text: parameterNames.type + ': ' + $scope.filterText2});
          $scope.showme = true;
          $scope.enginesListOptions.filterOptions.filterText = 'type:' + $scope.filterText2;
        } else {
          $scope.tags = [];
          $scope.showme = false;
          $scope.enginesListOptions.filterOptions.filterText = '';
        }
      };

      setFilterText();

      $scope.isEngineDown = function (lvt) {
        var tMinus30Days = Date.now() - 86400000 * 30;
        return (lvt < tMinus30Days);
      };

      $scope.doSchedulerSearch = function () {
        setFilterText();
        $scope.enginesListOptions.filterOptions.filterText += (';' + $scope.schedulerSearchText);
      };

      $scope.refreshEnginesList = function () {
        var defer = $q.defer();
        console.log('Entering refreshEnginesList...');
        enginesSvc.getEngines().then(
          function (enginesData) {
            console.log('Entering Success...');
            $scope.engines = enginesData.data.engines.map(function (e) {
              var engineListData = angular.copy(e);
              engineListData.engineStatus = $scope.isEngineDown(e.lastVerifiedTime);
              return engineListData;
            });
            if (angular.isObject($scope.selected) && angular.isDefined($scope.selected.config.data.name)) {
              $.grep($scope.engines, function (element, index) {
                if (element.name === $scope.selected.config.data.name) {
                  $scope.newItemIndex = index;
                  return true;
                } else {
                  return false;
                }
              });
              $scope.selected = null;
            }
            $scope.engineCount = enginesData.data.engines.length;
            $scope.lastRefreshedTime = Date.now();
            console.log('Exiting Success...');
            defer.resolve();
          },
          function (enginesData) {
            console.error('Failed to receive engines information with status code [' + enginesData.status + ']');
            defer.resolve();
          }
        );
        console.log('Exiting refreshEnginesList...');
        return defer.promise;
      };

      $scope.startPeriodicUpdate = function () {
        $scope.refreshPromise = $interval($scope.refreshEnginesList, 60000);
      };

      $scope.filterRemoved = function (tag) {
        var filterParameterName = tag.text.split(':')[0].trim();
        $log.log(filterParameterName);
        if (filterParameterName === 'Type') {
          $scope.type = 'none';
        } else if (filterParameterName === 'Connection') {
          $scope.status = 'none';
        }
        setFilterText();
      };

      $scope.clearFilter = function () {
        $scope.tags = [];
        $scope.showme = false;
        $scope.type = 'none';
        $scope.status = 'none';
        setFilterText();
      };

      // DROP DOWN MENU FOR ACTIONS
      $scope.actions = ['enginesList.camActionAddMenuLabel', 'enginesList.camActionEditMenuLabel', 'enginesList.camActionRemoveMenuLabel'];
      // MODAL ACTION
      $scope.modalAction = function (tempUrl, ctrl, modalAction) {
        var modalInstance = $modal.open({
          templateUrl: tempUrl,
          controller: ctrl,
          backdrop: 'static',
          size: '',
          resolve: {
            engine: function () {
              var ret;
              switch (modalAction) {
                case 'EDIT':
                  if ($scope.camSchedulerData) {
                    $scope.lastEditId = $scope.camSchedulerData.name;
                    ret = $scope.camSchedulerData;
                  }
                  break;
                case 'REMOVE':
                  if ($scope.camSchedulerData) {
                    ret = $scope.camSchedulerData;
                  }
                  break;
                case 'ADD':
                  $scope.camModalFocus = true;
                  delete $scope.selectedRowIndex;
                  break;
              }
              return ret;
            }
          }
        });
        $scope.addedScheduler = false;
        $scope.editedScheduler = false;
        $scope.removedScheduler = false;
        modalInstance.result.then(function (selectedItem) {
          console.info($rootScope.modalCancel);
          $scope.camSchedulerData = null;
          switch (modalAction) {
            case 'ADD':
              $scope.selected = selectedItem;
              $scope.addedScheduler = true;
              $scope.selectedRowIndex = $scope.engines.length;
              break;
            case 'EDIT':
              $scope.selected = selectedItem;
              $scope.editedScheduler = true;
              break;
            case 'REMOVE':
              $scope.selected = null;
              $scope.removedScheduler = true;
              $scope.newItemIndex = -1;
              $scope.camSchedulerData = null;
              $scope.selectedItemIndex = -1;
              delete $scope.selectedRowIndex;
              break;
          }
          $scope.refreshEnginesList();
          $timeout(function () {
            $scope.addedScheduler = false;
            $scope.removedScheduler = false;
            $scope.editedScheduler = false;
          }, 10000);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      // ACTION TO PERFORM
      $scope.camAction = function (event, index /*, action*/) {
        event.preventDefault();
        var templateUrl = ['views/modals/addEngineDialog.html',
          'views/modals/editEngineDialog.html',
          'views/modals/removeEngineDialog.html'];
        var modalActions = ['ADD', 'EDIT', 'REMOVE'];
        var controller = ['addEngineDlgCtrl', 'editEngineDlgCtrl', 'removeEngineDlgCtrl'];
        if (modalActions[index] === modalActions[0]) {
          $scope.selectedItemIndex = -1;
          $scope.camSchedulerData = null;
        }
        $scope.modalAction(templateUrl[index], controller[index], modalActions[index]);
      };

      $scope.selectScheduler = function (row) {
        $.grep($scope.engines, function (element, index) {
          if (element.name === row.entity.name) {
            $scope.selectedItemIndex = index;
            return true;
          } else {
            return false;
          }
        });
        if ($scope.selectedRowIndex !== row.rowIndex) {
          $scope.selectedRowIndex = row.rowIndex;
          $scope.camSchedulerData = row.entity;
        } else {
          delete $scope.selectedRowIndex;
          $scope.camSchedulerData = false;
        }
      };

      $scope.addedScheduler = false;
      $scope.editedScheduler = false;
      $scope.removedScheduler = false;
      $scope.closeAlert = function () {
        $scope.addedScheduler = false;
        $scope.editedScheduler = false;
        $scope.removedScheduler = false;
      };

      $scope.isRowUpdated = function (row) {
        var rowIndex, grid;
        grid = $scope.enginesListOptions.ngGrid;
        if ($scope.selectedItemIndex !== -1 && row.rowIndex === grid.rowMap[$scope.selectedItemIndex]) {
          row.elm.find('input').prop('checked', true);
          $scope.camSchedulerData = row.entity;
        } else {
          row.elm.find('input').prop('checked', false);
        }
        if ($scope.newItemIndex !== -1) {
          rowIndex = grid.rowMap[$scope.newItemIndex];
          if (row.rowIndex === rowIndex) {
            row.elm.find('input').prop('checked', true);
            $scope.camSchedulerData = row.entity;
            $scope.selectedItemIndex = $scope.newItemIndex;
            return 'camUpdatedRow';
          } else {
            return '';
          }
        } else {
          return '';
        }
      };

      $scope.$on('$destroy', function () {
        console.log('Cancelling interval.');
        $interval.cancel($scope.refreshPromise);
      });

      $scope.$on('ngGridEventData', function () {
        var rowIndex;
        var grid;
        grid = $scope.enginesListOptions.ngGrid;
        if ($scope.newItemIndex !== -1) {
          rowIndex = grid.rowMap[$scope.newItemIndex];
          $timeout(function () {
            grid.$viewport.scrollTop(rowIndex * grid.config.rowHeight);
          }, 0);
        }
      });

      $document.click(function () {
        $scope.newItemIndex = -1;
        $scope.selectedRowIndex = true;
      });

      $scope.refreshEnginesList();
      $scope.startPeriodicUpdate();

      $scope.hideAlert = function () {
        $modalStack.dismissAll();
        $scope.editedScheduler = false;
        $scope.addedScheduler = false;
        $scope.removedScheduler = false;
      };
    });
})();
