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
          'src/main.js',
          'src/**/*.js'
        ],
        dest: 'dist/jasmine-promise-matchers.js'
      }
    },
    uglify: {
      build: {
        src: 'dist/jasmine-promise-matchers.js',
        dest: 'dist/jasmine-promise-matchers.min.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      karma: {
        files: ['src/**/*.js', 'test/unit/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['jshint','test','concat','uglify']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('test:watch', ['karma:unit:start','watch']);
  grunt.registerTask('default', ['test']);

};
