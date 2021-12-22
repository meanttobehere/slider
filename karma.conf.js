module.exports = (config) => {
  config.set({
    client: {
      clearContext: false,
    },
    frameworks: ['jasmine-jquery', 'jasmine', 'karma-typescript'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/**/*.ts',
    ],
    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
    },
    reporters: ['spec', 'progress', 'coverage', 'kjhtml', 'karma-typescript'],
    browsers: ['Chrome'],
  });
};
