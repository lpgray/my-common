'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON('GruntDemo.jquery.json'),
		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
		'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + 
		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
		' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat : {
			options : {
				banner : '<%= banner %>',
				stripBanners : true
			},
			dist : {
				src : ['src/<%= pkg.name %>.js', 'test/<%= pkg.name %>_test.js'], // 合并 src下的GruntDemo.js与test下的GruntDemo_test.js
				dest : 'dest/<%= pkg.name %>.js'// 合并成dest下的GruntDemo.js
			}
		},	//
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 压缩后的文件声明
			},
			build : {
				src : 'src/<%= pkg.name %>.js',
				dest : 'dest/<%= pkg.name %>.min.js'// 压缩后的文件
			}
		},
		qunit : {
		  files: ['test/**/*.html']
		},
		hint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
		watch : {
		  files: '<config:hint.files>',
      tasks: 'hint qunit'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.registerTask('build', ['concat','uglify']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('hint', ['hint']);
  grunt.registerTask('watch',['watch']);
};
