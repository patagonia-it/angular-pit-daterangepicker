'use strict';

angular.module('angular-pit-daterangepicker.factory', [])
  .factory('PDrpParamsBuilder', pitDrpParamsBuilder);

function pitDrpParamsBuilder(){

  var PDrpParams = {

    withStart: function (start) {
      this.start = start;
      return this;
    },

    withEnd: function (end) {
      this.end = end;
      return this;
    },

    withMax: function (max) {
      this.max = max;
      return this;
    },

    withMin: function (min) {
      this.min = min;
      return this;
    },

    clean: function () {
      delete this.start;
      delete this.end;
      this.clean = true;
      return this;
    }
  };

  return {
    newParams: function () {
      var params = Object.create(PDrpParams);
      params.params = {};
      return params;
    },
    PTParams: PDrpParams
  };
}
