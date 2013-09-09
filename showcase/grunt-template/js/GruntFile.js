module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg : grunt.file.readJSON('package.json'),
    banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>-<%= pkg.author.email %>; */',
    // Task configuration.
    concat : {
      options : {
        banner : '<%= banner %>',
        stripBanners : true
      },
      dist : {
        src : ['src/plugins/*.js'], 
        dest : 'src/plugins.js'
      }
    },  //
    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 压缩后的文件声明
      },
      build : {
        src : 'src/plugins.js',
        dest : 'src/plugins.min.js'// 压缩后的文件
      }
    },
    qunit : {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch : {
      files: ['src/**/*.js', 'test/**/*.js'],
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