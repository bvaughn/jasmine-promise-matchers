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
      options: {
        mangle: {
          except: ['$injector']
        }
      },
      build: {
        src: 'dist/jasmine-promise-matchers.js',
        dest: 'dist/jasmine-promise-matchers.min.js'
      }
    },
    shell: {
      jasmine1: {
        command: 'npm run test',
        options: {
          execOptions: {
            cwd: 'jasmine-1.3'
          }
        }
      },
      jasmine2: {
        command: 'npm run test',
        options: {
          execOptions: {
            cwd: 'jasmine-2.2'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['jshint','test', 'concat','uglify']);
  grunt.registerTask('test', ['shell']);
  grunt.registerTask('default', ['test']);
};
