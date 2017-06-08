module.exports = {
  scripts: {
    files: [
      '<%= src %>/**/*.js',
      './Gruntfile.js',
      './grunt/**.js',
    ],
    tasks: [
      'eslint',
    ],
  },
  options: {
    reload: true,
  },
};
