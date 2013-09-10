'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON('package.json'),
		banner : '/*! \n' +
		' *  <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
		' *  Author: <%= pkg.author.name %>, Email: <%= pkg.author.email %>\n'+
		' *  Copyright (c) <%= grunt.template.today("yyyy") %> Gtmap Ltd. All Rights Reserved.\n' + 
		' */\n',
		// Task configuration.
		concat : {
			options : {
				banner : '<%= banner %>',
				stripBanners : false
			},
			dist : {
				src : ['src/plugins/*.js'], // 合并 
				dest : 'src/gtis-common.js'// 合并成dest下的GruntDemo.js
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 压缩后的文件声明
			},
			build : {
				src : 'src/gtis-common.js',
				dest : 'src/gtis-common.min.js'// 压缩后的文件
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Default task.
	grunt.registerTask('build', ['concat','uglify']);
};
