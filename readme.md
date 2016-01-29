# grunt-build-info-angular-injector

Allows you to inject information about the build into angular. Such as the branch the build came from, the version and the build number.

## Install

```
$ npm install grunt-build-info-angular-injector --save
```

## Usage
```js
grunt.loadNpmTasks('grunt-build-info-angular-injector');

grunt.initConfig({
  buildInfoAngularInjector: {
    module: 'my.angular.module',
    providerName: 'myBuildInfoProvider',
    target: 'src/buildInfoService.js'
  }
});

grunt.registerTask('default', ['buildInfoAngularInjector']);

grunt default --buildNumber=${env:BUILD_NUMBER} --branch=${env:GIT_BRANCH} --buildName=${env:JOB_NAME}
```

## Options

These are the configuration options you can pass to grunt.

### module

Type: `string`
Default: `buildInfo`

The name of the already existing angular module to attach this provider to.

### providerName

Type: `string`
Default: `buildInfo`

The name the provider will have within your application, ie. the name of the injectable.

### target

Type: `string`
Default: `src/buildInfoService.js`

The target file for the provider. This will be created, you will still have to include it in your template.

## Parameters

These are the command line parameters which you can call grunt with to be injected into the provider.

*buildNumber e.g. --buildNumber=21
*buildName e.g. --buildName=dev
*branch e.g. --branch=master
