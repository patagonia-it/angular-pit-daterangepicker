'use strict';

angular.module('angular-pit-daterangepicker.directive', ['angular-pit-daterangepicker.factory'])
  .directive('pitDaterangepicker', pitDaterangepicker);

function pitDaterangepicker(pitDaterangepickerOptions){
  return {
    restrict: 'A',
    require: '?ngModel',
    scope:{
      pitDrpStart: '=',
      pitDrpEnd: '=',
      pitDrpMin: '=',
      pitDrpMax: '=',
      pitDrpClean: '='
    },
    link: function postLink(scope, element, attrs) {
      var config = angular.copy(pitDaterangepickerOptions.config);

      if(angular.isUndefined(config.locale)){
        config.locale = {};
      }
      if(angular.isUndefined(config.locale.separator)){
        config.locale.separator = ' - ';
      }
      if(angular.isUndefined(config.locale.format)){
        config.locale.format = 'DD-MMM-YYYY';
      }

      if(angular.isDefined(scope.pitDrpMin)){
        config.minDate = scope.pitDrpMin;
      }
      if(angular.isDefined(scope.pitDrpMax)){
        config.maxDate = scope.pitDrpMax;
      }

      if((angular.isDefined(scope.pitDrpClean) && scope.pitDrpClean) || (angular.isUndefined(scope.pitDrpStart) || angular.isUndefined(scope.pitDrpEnd))){
        config.autoUpdateInput = false;

        $(element).on('apply.daterangepicker', function(ev, picker) {
          $(element).val(picker.startDate.format(config.locale.format) + config.locale.separator + picker.endDate.format(config.locale.format));
        });
        $(element).on('cancel.daterangepicker', function(ev, picker) {
          $(element).val('');
        });
      }

      $(element).daterangepicker(config);
    }
  };
}
