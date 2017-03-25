// Karma configuration
// Generated on Tue Mar 21 2017 15:51:34 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    plugins: [
      require('karma-requirejs'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-browserify')
    ],
    files: [
      { pattern: './src/*.spec.ts' },
      { pattern: './src/**/*.spec.ts'}
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.ts': ['browserify']
    },
    browserify: {
      debug: true,
      plugin: [
        ['tsify', {target: 'es5'}]
      ]
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
