module.exports = (grunt) => {
  // time how long tasks take
  require('time-grunt')(grunt); // eslint-disable-line global-require

  require('load-grunt-config')(grunt, {  // eslint-disable-line global-require
    data: {
      src: './src',
      dest: './_denki',
    },
  });

  grunt.registerTask('dev', [
    'env:development',
    'eslint',
    'watch',
  ]);

  grunt.registerTask('build', [
    'env:production',
    'eslint',
  ]);

  grunt.registerTask('default', ['dev']);
};
