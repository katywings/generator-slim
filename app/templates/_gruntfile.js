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
      bower_js: {
        src: ['bower_modules/jquery/jquery.min.js',
        'bower_modules/underscore/underscore-min.js',
        'bower_modules/bootstrap/docs/assets/js/bootstrap.min.js',
        'bower_modules/backbone/backbone-min.js',
        'bower_modules/backbone.marionette/public/javascripts/json2.js',
        'bower_modules/backbone.marionette/public/javascripts/backbone.babysitter.js',
        'bower_modules/backbone.marionette/public/javascripts/backbone.wreqr.js',
        'bower_modules/backbone.marionette/lib/backbone.marionette.min.js',
        'bower_modules/moment/min/moment.min.js',
        'bower_modules/moment/min/langs.min.js'
        ],
        dest: 'public/js/lib.min.js'
      },
      bower_css: {
        src: ['bower_modules/bootstrap/docs/assets/css/bootstrap.css',
        'bower_modules/bootstrap/docs/assets/css/bootstrap-responsive.css'],
        dest: 'public/css/lib.css'
      }
    },
    copy: {
      dist: {
        files: [
          {src: ['public/**'], dest: 'dist/'},
          {src: ['app/**'], dest: 'dist/'},
          {src: ['composer_modules/**'], dest: 'dist/'},
        ]
      }
    },
    bower: {
      install: {
       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    coffee: {
      compile: {
        files: {
          'public/dev/js/app.js': ['app/src/coffee/*.coffee',
          'app/src/coffee/views/*.coffee',
          'app/src/coffee/models/*.coffee',
          'app/src/coffee/collections/*.coffee',] // compile and concat into single file
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
      development: ["logs","cache"],
      production: ["public/dev", "logs", "cache"]
    },
    mkdir: {
      options: {
        // Task-specific options go here.
      },
      clean: {
        options: {
          create: ['logs','cache']
        }
      },
      dist: {
        options: {
          create: ['dist/logs','dist/cache']
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
        nospawn: true,
        livereload: true
      },
      coffee: {
        files: ['**/*.coffee','**/*.twig'],
        tasks: ['coffee','uglify:app'], 
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
      test: {
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
        tasks: ['php','watch','browser']
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
  
  // Modules for server and watcher
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('assemble');
  
  // Basic tasks.
  grunt.registerTask('default', ['development']);
  grunt.registerTask('build', ['coffee','uglify:app','less']);
  grunt.registerTask('fetch', ['exec','bower']);
  grunt.registerTask('dist', ['production','copy:dist','clean:dist','mkdir:dist']);
  grunt.registerTask('lib', ['concat','uglify:lib']);

  // Setup environment for development
  grunt.registerTask('development', ['build','lib','assemble:development_html','assemble:development_php','clean:development','mkdir:clean']);

  // Setup environment for production
  grunt.registerTask('production', ['build','lib','assemble:production_html','assemble:production_php','clean:production','mkdir:clean']);

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