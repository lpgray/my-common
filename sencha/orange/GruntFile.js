module.exports = function(grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    banner : '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
    concat : {
      options : {
        banner : '<%= banner %>',
        stripBanners : true
      },
      myjs : {
        src : [''], 
        dest : ''
      },
      css : {
        src : [''], 
        dest : ''
      }
    },
    uglify : {
      options : {
        banner : '<%= banner %>'
      },
      build : {
        src : '',
        dest : ''
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