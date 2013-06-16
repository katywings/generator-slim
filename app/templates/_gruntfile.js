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
      dist: {
        src: ['app/src/coffee/*.coffee'],
        dest: 'public/js/dev/app.coffee'
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
          'public/dev/js/app.js': ['app/src/coffee/*.coffee','app/src/coffee/views/*.coffee'] // compile and concat into single file
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/app.min.js': ['public/dev/js/app.js']
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
      development: ["logs","cache"],
      production: ["public/dev", "logs", "cache"]
    },
    mkdir: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        options: {
          create: ['logs','cache']
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
      scripts: {
        files: ['**/*.coffee','**/*.less','**/*.twig'],
        tasks: ['build'],
        options: {
          nospawn: true,
          livereload: true
        },
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mkdir');
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
  grunt.registerTask('build', ['coffee','uglify','less']);
  grunt.registerTask('fetch', ['exec','bower']);

  // Setup environment for development
  grunt.registerTask('development', ['build','assemble:development_html','assemble:development_php','clean:development','mkdir']);

  // Setup environment for production
  grunt.registerTask('production', ['build','assemble:production_html','assemble:production_php','clean:production','mkdir']);

  grunt.registerTask('server', function(env){
    if(env == 'production'){
      grunt.task.run(['production','parallel:server']);
    } else {
      grunt.task.run(['default','parallel:server']);
    }
  });

  grunt.registerTask('browser', function(){
    setTimeout(grunt.task.run(['open:server']), 10000);
    
  });
};