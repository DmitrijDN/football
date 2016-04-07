module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['frontend/javascripts/**/*.js'],
		server_js: ['backend/**/*.js'],
		templates: ['frontend/javascripts/**/*.jade'],
		stylesheets: ['frontend/styles/general/*.styl'],
		views: ['frontend/views/**/*.jade'],

		jshint: {
			client: ['Gruntfile.js', '<%= javascripts %>', '!frontend/javascripts/libs/**/*.js'],
			server: ['<%= server_js %>'],
			options: {
				sub: true,
				smarttabs: true,
				multistr: true,
				loopfunc: true
			}
		},

		watch: {
			options: {
				livereload: false
			},
			scripts: {
				files: ['<%= javascripts %>'],
				tasks: ['javascripts']
			},
			server_js: {
				files: ['<%= server_js %>'],
				tasks: ['jshint:server'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['<%= stylesheets %>'],
				tasks: ['stylus']
			},
			jade_templates: {
				files: ['<%= templates %>'],
				tasks: ['jade:templates']
			},
			jade_pages: {
				files: ['<%= views %>'],
				tasks: ['jade:pages']
			},
		},

		jade: {
			templates: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts/',
					src: ['**/*.jade'],
					dest: 'public/templates/',
					ext: '.html'
				}],
			},
			pages: {
				files: {
					'public/_index.html': 'frontend/views/index.jade'
				}
			}
		},

		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['frontend/styles/'],
					'compress': true
				},
				files: {
					'public/styles/css/style.css': ['<%= stylesheets %>']
				}
			}
		},

		copy: {
			libs: {
				files: [{
					expand: false,
					src: ['bower_components/requirejs/require.js'],
					dest: 'public/javascripts/libs/require.js'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/FontAwesome.otf'],
					dest: 'public/styles/fonts/FontAwesome.otf'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/fontawesome-webfont.eot'],
					dest: 'public/styles/fonts/fontawesome-webfont.eot'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/fontawesome-webfont.svg'],
					dest: 'public/styles/fonts/fontawesome-webfont.svg'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf'],
					dest: 'public/styles/fonts/fontawesome-webfont.ttf'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/fontawesome-webfont.woff'],
					dest: 'public/styles/fonts/fontawesome-webfont.woff'
				}, {
					expand: false,
					src: ['bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2'],
					dest: 'public/styles/fonts/fontawesome-webfont.woff2'
				}, ]
			},
			js: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts/',
					src: ['**'],
					dest: 'public/javascripts/'
				}]
			},
			resources: {
                files: [{
                        expand: true,
                        cwd: 'frontend/resources/',
                        src: ['**'],
                        dest: 'public/resources/'
                    }
                ]
            },
		},

		clean: {
			public_js: {
				src: ['public/javascripts']
			}
		},

		browserify: {
			my: {
				dest: 'public/javascripts/main.js',
				src: ['frontend/javascripts/**/*.js']
			}
		},

		concat: {
			options: {
				separator: '\n'
			},
			js: {
				src: [
					'bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/alertify.js/dist/js/alertify.js',
					'bower_components/angular-bootstrap/ui-bootstrap.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
				],
				dest: 'public/javascripts/libs.js',
			},
			css: {
				src: [
					'bower_components/alertify.js/dist/alertify.css',
					'bower_components/components-font-awesome/css/font-awesome.min.css',
					'bower_components/bootstrap/dist/css/bootstrap.css',
				],
				dest: 'public/styles/css/libs.css'
			}
		},
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('common', ['clean', 'jshint', 'jade', 'stylus', 'copy', 'concat']);
	grunt.registerTask('default', ['common', 'browserify', 'concat']);
	grunt.registerTask('dev', ['common', 'browserify', 'concat', 'watch']);
	grunt.registerTask('javascripts', ['jshint', 'clean', 'copy', 'concat', 'browserify']);
	grunt.registerTask('release', ['clean', 'jshint', 'jade', 'stylus', 'copy', 'concat', 'browserify', 'uglify']);
};