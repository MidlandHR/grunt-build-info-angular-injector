module.exports = function(grunt) {
    var _ = require('lodash');

    var getConfig = function() {
        var config = grunt.config('injectBuildInfo'),
            defaultConfig = {
                module: 'buildInfo',
                providerName: 'buildInfo',
                target: 'src/buildInfoService.js'
            };

        _.merge(defaultConfig, config);

        return defaultConfig;
    };

    var getBuildInfo = function() {
        return {
            branch: grunt.option('branch') || 'master',
            number: grunt.option('buildNumber') || new Date().toISOString(),
            name: grunt.option('buildName') || 'dev'
        };
    };

    var loadProviderTemplate = function() {
        return grunt.file.read(__dirname + '/buildInformationProvider.js');
    };

    var interpolate = function(template, interpolation) {
        var assembleInterpolation = function(interpolation, string, output) {
            for(var item in interpolation){
                var itemString = string + item;

                if(_.isObject(interpolation[item])) {
                    assembleInterpolation(interpolation[item], itemString + '.', output);
                } else {
                    output.push({name: itemString, value: interpolation[item]});
                }
            }
        };

        var interpolations = [];

        assembleInterpolation(interpolation, '', interpolations);

        interpolations.forEach(function(interpolate) {
            var expression = new RegExp('<%= ' + interpolate.name + ' %>');
            template = template.replace(expression, interpolate.value);
        });

        return template;
    };

    grunt.registerTask('injectBuildInfo', function() {
        var config = getConfig(),
            buildInfo = getBuildInfo();

        grunt.file.write(config.target, interpolate(loadProviderTemplate(), {config: config, build: buildInfo}));
    });
};
