'use strict';

angular.module('angular-pit-daterangepicker.options', ['angularMoment'])
  .provider('pitDaterangepickerOptions', pitDaterangepickerOptionsProvider);

function pitDaterangepickerOptionsProvider(moment) {

  var config = {
    locale: {
      format: 'DD-MMM-YYYY',
      separator: ' - ',
      applyLabel: 'Aplicar',
      cancelLabel: 'Limpiar',
      fromLabel: 'Desde',
      toLabel: 'Hasta',
      customRangeLabel: 'Rango personalizado',
      daysOfWeek: [
        'Do',
        'Lu',
        'Ma',
        'Mi',
        'Ju',
        'Vi',
        'Sa'
      ],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      firstDay: 1
    },
    ranges: {
      'Hoy': [moment(), moment()],
      'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
      'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
      'Este mes': [moment().startOf('month'), moment().endOf('month')],
      'Último mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  };

  function PitDaterangepickerOptions(config) {
    this.config = config;
  };

  this.setLocale = function (locale) {
    config.locale = locale;
  };

  this.setRanges = function (ranges) {
    config.ranges= ranges;
  };

  this.$get = [function () {
    return new PitDaterangepickerOptions(config);
  }];
}
