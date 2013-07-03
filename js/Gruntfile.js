'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON('mycommon.js.json'),
		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
		' * Copyright (c) <%= grunt.template.today("yyyy") %> Gtmap Ltd. All Rights Reserved.*/\n',
		// Task configuration.
		concat : {
			options : {
				banner : '<%= banner %>',
				stripBanners : false
			},
			dist : {
				src : [	'slip/ajax4data-1.1.js'
						, 'slip/ajaxSubmit-1.0.js'
						, 'slip/before-rm.0.2.js'
						, 'slip/closeremove.1.0.js'
						, 'slip/form-seri.0.2.js'
						, 'slip/gridtree-1.2.0.js'
						, 'slip/pagin.0.2.js'
						], // 合并 
				dest : 'dest/gtis-common.js'// 合并成dest下的GruntDemo.js
			}
		},	//
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 压缩后的文件声明
			},
			build : {
				src : 'dest/gtis-common.js',
				dest : 'dest/gtis-common.min.js'// 压缩后的文件
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Default task.
	grunt.registerTask('default', ['concat','uglify']);
};
