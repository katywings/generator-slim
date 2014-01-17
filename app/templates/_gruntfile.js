var jslib = ['bower_modules/jquery/jquery.min.js',
        'bower_modules/underscore/underscore-min.js',
        'bower_modules/bootstrap/dist/js/bootstrap.min.js',
        'bower_modules/backbone/backbone-min.js',
        'bower_modules/backbone.marionette/public/javascripts/json2.js',
        'bower_modules/backbone.marionette/public/javascripts/backbone.babysitter.js',
        'bower_modules/backbone.marionette/public/javascripts/backbone.wreqr.js',
        'bower_modules/backbone.marionette/lib/backbone.marionette.min.js',
        'bower_modules/moment/min/moment.min.js',
        'bower_modules/moment/min/langs.min.js'
        ];

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      composer_install: {
        command: 'php composer.phar install',
        stdout: false,
        stderr: false
      }
    },
    concat: {
      coffee: {
        src: ['app/src/coffee/*.coffee',
        'app/src/coffee/views/*.coffee',
        'app/src/coffee/models/*.coffee',
        'app/src/coffee/collections/*.coffee'],
        dest: 'tmp/app.coffee'
      },
      bower_js: {
        src: jslib,
        dest: 'public/js/lib.min.js'
      },
      bower_css: {
        src: ['bower_modules/bootstrap/dist/css/bootstrap.css',
        'bower_modules/bootstrap/dist/css/bootstrap-responsive.css'],
        dest: 'public/css/lib.css'
      }
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, flatten: true, src: ['bower_modules/bootstrap/img/*'], dest: 'public/img/', filter: 'isFile'}
        ]
      },
      dist: {
        files: [
          {src: ['public/.htaccess'], dest: 'dist/', filter: 'isFile'},
          {src: ['public/**'], dest: 'dist/'},
          {src: ['app/**'], dest: 'dist/'},
          {src: ['composer_modules/**'], dest: 'dist/'},
        ]
      }
    },
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'public/dev/js/app.js': ['tmp/app.coffee']
        }
      }
    },
    uglify: {
      app: {
        files: {
          'public/js/app.min.js': ['public/dev/js/app.js']
        }
      },
      lib: {
        files: {
          'public/js/lib.min.js': ['public/js/lib.min.js']
        }
      }
    },
    less: {
      development: {
        files: {
          "public/dev/css/styles.css": "app/src/less/styles.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "public/css/styles.min.css": "app/src/less/styles.less"
        }
      }
    },
    clean: {
      dist: ["dist/app/src"],
      development: ["tmp"],
      production: ["public/dev", "tmp"]
    },
    mkdir: {
      options: {
        // Task-specific options go here.
      },
      clean: {
        options: {
          create: ['tmp','tmp/logs','tmp/cache']
        }
      },
      dist: {
        options: {
          create: ['dist/tmp','dist/tmp/logs','dist/tmp/cache']
        }
      }
    },
    open : {
      server : {
        path: 'http://localhost:<%= serverPort %>'
      },
    },
    assemble: {
      development_html: {
        options: {
          dev: true,
          prod: false,
          ext: '.html'
        },
        files: {
          "app/views/layouts/head.html": ["app/src/hbs/head.hbs"]
        }
      },
      development_php: {
        options: {
          dev: true,
          prod: false,
          ext: '.php'
        },
        files: {
          "app/config/config.env.php": ["app/src/hbs/config.env.hbs"]
        }
      },
      production_html: {
        options: {
          dev: false,
          prod: true,
          ext: '.html'
        },
        files: {
          "app/views/layouts/head.html": ["app/src/hbs/head.hbs"]
        }
      },
      production_php: {
        options: {
          dev: false,
          prod: true,
          ext: '.php'
        },
        files: {
          "app/config/config.env.php": ["app/src/hbs/config.env.hbs"]
        }
      },
      
    },
    watch: {
      options: {
        nospawn: false,
        livereload: true
      },
      coffee: {
        files: ['**/*.coffee','**/*.twig'],
        tasks: ['concat:coffee','coffee','uglify:app'], 
      },
      less: {
        files: ['**/*.less','**/*.twig'],
        tasks: ['less'], 
      },
      twig: {
        files: ['**/*.twig'],
      },
    },
    php: {
      server: {
        options: {
          port: <%= serverPort %>,
          keepalive: true,
          open: false,
          base: 'public'
        }
      }
    },
    parallel: {
      server: {
        options: {
          grunt: true,
          stream: true
        },
        tasks: ['php:server','watch','browser']
      }
    },
    jasmine: {
      app: {
        src: 'public/js/*.js',
        options: {
          vendor: jslib,
          specs: 'test/jasmine/*.js'
        }
      }
    }
  });

  // Basic tasks
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-open');

  // Compile tools
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Clean tools
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Testing tools
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Modules for server and watcher
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('assemble');
  
  // Basic tasks.
  grunt.registerTask('default', ['development']);
  grunt.registerTask('build', ['concat:coffee','coffee','uglify:app','less']);
  grunt.registerTask('fetch', ['exec','bower']);
  grunt.registerTask('dist', ['production','copy:dist','clean:dist','mkdir:dist']);
  grunt.registerTask('lib', function(env){
    if(env == 'production'){
      grunt.task.run(['concat:bower_js','concat:bower_css','uglify:lib']);
    } else {
      grunt.task.run(['concat:bower_js','concat:bower_css']);
    }
  });
  grunt.registerTask('test', ['jasmine']);

  // Setup environment for development
  grunt.registerTask('development', ['copy:bootstrap','build','lib','assemble:development_html','assemble:development_php','clean:development','mkdir:clean']);

  // Setup environment for production
  grunt.registerTask('production', ['copy:bootstrap','build','lib:production','assemble:production_html','assemble:production_php','clean:production','mkdir:clean']);

  grunt.registerTask('server', function(env){
    if(env == 'production'){
      grunt.task.run(['production','parallel:server']);
    } else {
      grunt.task.run(['default','parallel:server']);
    }
  });

  grunt.registerTask('browser', function(){
    var done = this.async();
    setTimeout(function(){
      grunt.task.run(['open:server']);
      done();
    }, 1000);
  });
};