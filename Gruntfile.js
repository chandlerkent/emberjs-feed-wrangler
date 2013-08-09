/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

  grunt.initConfig({
    /* 
       A simple ordered concatenation strategy.
       This will start at app/app.js and begin
       adding dependencies in the correct order
       writing their string contents into
       'build/application.js'

       Additionally it will wrap them in evals
       with @ sourceURL statements so errors, log
       statements and debugging will reference
       the source files by line number.

       You would set this option to false for 
       production.
    */
    neuter: {
      options: {
        //includeSourceURL: true,
        template: "{%= src %}",
        filepathTransform: function(filepath) {
          filepath = "client/" + filepath;
          filepath = filepath.replace(/\.js$/, '');
          console.log(filepath);
          return filepath;
        }
      },
      'client/public/application.js': 'client/app/app.js'
    },

    /* 
      Reads the projects .jshintrc file and applies coding
      standards. Doesn't lint the dependencies or test
      support files.
    */
    jshint: {
      all: ['Gruntfile.js', 'client/app/**/*.js', '!client/dependencies/*.*'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /* 
      Finds Handlebars templates and precompiles them into functions.
      The provides two benefits:

      1. Templates render much faster
      2. We only need to include the handlebars-runtime microlib
         and not the entire Handlebars parser.

      Files will be written out to dependencies/compiled/templates.js
      which is required within the project files so will end up
      as part of our application.

      The compiled result will be stored in
      Ember.TEMPLATES keyed on their file path (with the 'app/templates' stripped)
    */
    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/client\/app\/templates\//, '').replace(/_template/, "");
        }
      },
      'client/dependencies/compiled/templates.js': ["client/app/templates/**/*.hbs"]
    },

    /*
      Find all the <whatever>_test.js files in the test folder.
      These will get loaded via script tags when the task is run.
      This gets run as part of the larger 'test' task registered
      below.
    */
    build_test_runner_file: {
      all: ['test/**/*_test.js']
    }
  });
  
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  
  /*
    A task to run the application's unit tests via the command line.
    It will
      - convert all the handlebars templates into compile functions
      - combine these files + application files in order
      - lint the result
      - build an html file with a script tag for each test file
      - headlessy load this page and print the test runner results
  */
  grunt.registerTask('test', ['emberTemplates', 'neuter', 'jshint', 'build_test_runner_file', 'qunit']);

  /*
    Default task. Compiles templates, neuters application code, and begins
    watching for changes.
  */
  grunt.registerTask('default', ['emberTemplates', 'neuter']);
};