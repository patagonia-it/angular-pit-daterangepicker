'use strict';

angular.module('angular-pit-daterangepicker.directive', ['angular-pit-daterangepicker.factory'])
    .directive('pitDaterangepicker', pitDaterangepicker);

function pitDaterangepicker(){
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      $(element).daterangepicker({});
    }
  };
}
