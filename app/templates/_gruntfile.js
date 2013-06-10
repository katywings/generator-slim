module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      composer_install: {
        command: 'php composer.phar install',
        stdout: false,
        stderr: false
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-exec');

  // Default task(s).
  grunt.registerTask('fetch', ['exec']);

};