'use strict';

angular.module('angular-pit-daterangepicker.directive', ['angular-pit-daterangepicker.factory'])
  .directive('pitDaterangepicker', pitDaterangepicker);

function pitDaterangepicker(pitDaterangepickerOptions){
  return {
    restrict: 'A',
    require: 'ngModel',
    scope:{
      pitDrpParams: '='
    },
    link: function postLink(scope, element, attrs, ngModel) {
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

      if(angular.isDefined(scope.pitDrpParams.min)){
        config.minDate = scope.pitDrpParams.min;
      }
      if(angular.isDefined(scope.pitDrpParams.max)){
        config.maxDate = scope.pitDrpParams.max;
      }

      if(angular.isDefined(scope.pitDrpParams.otherRanges)){
        if(scope.pitDrpParams.otherRanges == true){
          config.ranges = scope.pitDrpParams.ranges;
        }
      }

      if((angular.isDefined(scope.pitDrpParams.clean) && scope.pitDrpParams.clean) || (angular.isUndefined(scope.pitDrpParams.start) || angular.isUndefined(scope.pitDrpParams.end))){
        config.autoUpdateInput = false;

        $(element).on('apply.daterangepicker', function(ev, picker) {
          $(element).val(picker.startDate.format(config.locale.format) + config.locale.separator + picker.endDate.format(config.locale.format));
          scope.$apply(function(){
            ngModel.$setViewValue({
              start: picker.startDate.toISOString(),
              end: picker.endDate.toISOString()
            });
          });
        });
        $(element).on('cancel.daterangepicker', function(ev, picker) {
          $(element).val('');
          scope.$apply(function(){
            ngModel.$setViewValue({});
          });
        });
      }
      $(element).daterangepicker(config);
    }
  };
}
