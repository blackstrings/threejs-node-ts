//This config suppose to run jasmine/karma and error on any build issues
module.exports = function (config) {

  config.set({

    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha' ],
    reporters: [ 'mocha' ],

    files: [
      // ...
    ],

    // ...
    webpack: {
      plugins: [
          function()
          {
              this.plugin("done", function(stats)
              {
                  // Log each of the errors
                  stats.compilation.errors.forEach(function (error) {
                      console.log(error.message || error);
                  });

                  // Pretend no assets were generated. This prevents the tests
                  // from running making it clear that there were errors.
                  stats.stats = [{
                      toJson: function () {
                          return this;
                      },
                      assets: []
                  }];                      
              });
          }
      ]
    }
  })

}