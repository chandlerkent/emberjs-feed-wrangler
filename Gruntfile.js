/*jshint camelcase: false */
/*global module:false, process */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    build: {
      version: '_<%= grunt.template.today("yyyy-mm-dd-HHMM") %>_<%= pkg.version %>',
      dir: "client/build"
    },
    client_key: process.env.FEED_WRANGLER_CLIENT_KEY,
    
    clean: ["<%= build.dir %>/**/*.*"],
    
    /* 
      Reads the projects .jshintrc file and applies coding
      standards. Doesn't lint the dependencies or test
      support files.
    */
    jshint: {
      all: ['Gruntfile.js', 'client/app/**/*.js', "server/**/*.js", '!client/dependencies/*.*', "!<%= build.dir %>/**/*.*"],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    copy: {
      main: {
        expand: true,
        cwd: "client/public/",
        src: '**',
        dest: '<%= build.dir %>/',
        flatten: true,
        options: {
          processContent: function(content, srcPath) {
            return grunt.template.process(content);
          },
          processContentExclude: ["**/*.ico"]
        }
      }
    },
    
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
        includeSourceURL: true,
        template: "{%= src %}",
        filepathTransform: function(filepath) {
          filepath = "client/" + filepath;
          filepath = filepath.replace(/\.js$/, '');
          return filepath;
        }
      },
      '<%= build.dir %>/application<%= build.version %>.js': 'client/app/app.js'
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
    
    watch: {
      application_code: {
        files: ['client/dependencies/**/*.js', 'client/app/**/*.js', "client/public/**/*.js"],
        tasks: ["jshint", 'neuter']
      },
      handlebars_templates: {
        files: ['client/app/**/*.hbs'],
        tasks: ['emberTemplates', 'neuter']
      },
      server_code: {
        files: ["server/**/*.js"],
        tasks: ["jshint"]
      }
    }
  });
  
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('heroku:production', ["build:production"]);
  
  /*
    Default task. Compiles templates, neuters application code, and begins
    watching for changes.
  */
  grunt.registerTask('default', ["build", "watch"]);
  
  grunt.registerTask("build", ["jshint", "clean", "copy", "emberTemplates", "neuter"]);
};