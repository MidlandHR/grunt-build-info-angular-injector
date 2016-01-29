(function(module) {
  'use strict';

  module.value('<%= config.providerName %>', {
    buildNumber: '<%= build.number %>',
    buildName: '<%= build.name %>',
    branch: '<%= build.branch %>'
  });

})(angular.module('<%= config.module %>'));
