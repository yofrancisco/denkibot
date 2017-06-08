module.exports = {
  options: {
    configFile: './.eslintrc.json',
  },
  // target: ['<%= src %>/**/*.js', './grunt/**.js'],
  target: ['<%= src %>/lib/**/*.js', '<%= src %>/denkibot.js', './grunt/**.js'],
};
