module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'application/static/css/style.css': 'application/static/scss/style.scss'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'application/static/css/style.min.css': ['application/static/css/normalize.min.css', 'application/static/css/style.css']
				}
			}
		},
		uglify: {
			js: {
				files: {
					'application/static/js/main.min.js': [
						'application/static/js/lib/jquery.min.js',
						'application/static/js/lib/jquery.lazyload.min.js',
						'application/static/js/lib/jquery.smoothState.js',
						'application/static/js/lib/slick.min.js',
						'application/static/js/main.js',
					]
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: ['application/static/js/*.js', "!application/static/js/main.min.js"],
				tasks: ['uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
};