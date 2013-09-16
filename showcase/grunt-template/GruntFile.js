module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg : grunt.file.readJSON('package.json'),
    banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>-<%= pkg.author.email %>; */',
    concat : {
      options : {
        banner : '<%= banner %>',
        stripBanners : true
      },
      js : {
        src : ['js/lib/jquery-1.10.2.js', 'js/lib/plugins/**/*.js'], 
        dest : 'js/src/lib.js'
      },
      css : {
        src : ['css/plugins/**/*.css'], 
        dest : 'css/plugins.css'
      }
    },
    concatcss : {
      options : {
        banner : '<%= banner %>',
        stripBanners : true
      },
      dist : {
        src : ['./css/plugins/**/*.css'], 
        dest : './css/plugins.css'
      }
    },
    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 压缩后的文件声明
      },
      build : {
        src : 'js/src/lib.js',
        dest : 'js/src/lib.min.js'
      }
    },
    qunit : {
      files: ['js/test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'js/src/**/*.js', 'js/test/**/*.js']
    },
    watch : {
      files: ['js/src/**/*.js', 'js/test/**/*.js'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('build', ['concat','uglify']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('watch',['watch']);
};