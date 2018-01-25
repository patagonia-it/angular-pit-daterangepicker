'use strict';

angular.module('angular-pit-daterangepicker.directive', ['angular-pit-daterangepicker.factory', 'angularMoment'])
  .directive('pitDaterangepicker', pitDaterangepicker);

function pitDaterangepicker(pitDaterangepickerOptions) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      pitDrpParams: '=',
      eventOn: '@'
    },
    link: function postLink(scope, element, attrs, ngModel) {
      var config = angular.copy(pitDaterangepickerOptions.config);

      if (angular.isUndefined(config.locale)) {
        config.locale = {};
      }
      if (angular.isUndefined(config.locale.separator)) {
        config.locale.separator = ' - ';
      }
      if (angular.isUndefined(config.locale.format)) {
        config.locale.format = 'DD-MMM-YYYY';
      }

      if (angular.isDefined(scope.pitDrpParams.min)) {
        config.minDate = scope.pitDrpParams.min;
      }
      if (angular.isDefined(scope.pitDrpParams.max)) {
        config.maxDate = scope.pitDrpParams.max;
      }

      if (angular.isDefined(scope.pitDrpParams.otherRanges)) {
        if (scope.pitDrpParams.otherRanges == true) {
          config.ranges = scope.pitDrpParams.ranges;
        }
      }

      if (angular.isDefined(scope.pitDrpParams.start)) {
        config.startDate = moment(scope.pitDrpParams.start).format(config.locale.format);
      }

      if (angular.isDefined(scope.pitDrpParams.end)) {
        config.endDate = moment(scope.pitDrpParams.end).format(config.locale.format);
      }

      config.autoUpdateInput = false;
      if (angular.isDefined(scope.pitDrpParams.autoUpdateInput)) {
        config.autoUpdateInput = scope.pitDrpParams.autoUpdateInput;
      }

      if ((angular.isDefined(scope.pitDrpParams.clean) && scope.pitDrpParams.clean) || (angular.isUndefined(scope.pitDrpParams.start) || angular.isUndefined(scope.pitDrpParams.end))) {
        $(element).on('apply.daterangepicker', function (ev, picker) {
          $(element).val(picker.startDate.format(config.locale.format) + config.locale.separator + picker.endDate.format(config.locale.format));
          scope.$apply(function () {
            ngModel.$setViewValue({
              start: picker.startDate.toISOString(),
              end: picker.endDate.toISOString()
            });
          });
        });
        $(element).on('cancel.daterangepicker', function (ev, picker) {
          $(element).val('');
          scope.$apply(function () {
            ngModel.$setViewValue({});
          });
        });
      }

      if (angular.isDefined(scope.eventOn)) {
        scope.$on(scope.eventOn, function (event, start, end) {
          if (start !== undefined && end !== undefined) {
            $(element).data('daterangepicker').setStartDate(moment(start).format(config.locale.format));
            $(element).data('daterangepicker').setEndDate(moment(end).format(config.locale.format));
          }else{
            $(element).val('');
            ngModel.$setViewValue({});
          }

        });
      }

      $(element).daterangepicker(config);


    }
  };
}
