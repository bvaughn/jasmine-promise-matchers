'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      beforeconcat: ['src/**/*.js']
    },
    concat: {
      dist: {
        src: [
          'source/**/*.js'
        ],
        dest: 'dist/jasmine-promise-matchers.js'
      }
    },
    uglify: {
      build: {
        src: 'dist/jasmine-promise-matchers.js',
        dest: 'dist/jasmine-promise-matchers.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['jshint','concat','uglify']);
  grunt.registerTask('default', ['build']);
};
