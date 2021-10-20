module.exports = function(config) {
    config.set({      
      frameworks: ['jasmine-jquery', 'jasmine', 'karma-typescript'],
      files: [
        'node_modules/jquery/dist/jquery.js',
        'src/slider/**/*.ts'        
      ],      
      preprocessors: {
        'src/slider/**/*.ts': ['karma-typescript']        
      },
      reporters: ['progress', 'karma-typescript'],     
      port: 9876,      
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],      
    })
  };