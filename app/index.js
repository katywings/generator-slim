'use strict';

var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var shelljs = require('shelljs');
var randomString = require('random-string');
var foldername = path.basename(process.cwd());

var SlimGenerator = yeoman.generators.Base.extend({

    init: function () {

        this.appname = this._.camelize(this._.slugify(this._.humanize(foldername)));
        this.pkg = require('../package.json');
        this.description = this.pkg.description;
        this.slimDependencies = ['php', 'composer'];

        this.slimDependenciesInstalled = this.slimDependencies.every(function (depend) {
            return shelljs.which(depend);
        });

        this.on('end', function () {

            var slimInstall = {
                skipInstall: this.options['skip-install']
            };

            if (!this.slimDependenciesInstalled) {
                var missingMsg =
                chalk.red('\n===================================================================\n') + chalk.underline.bgRed('Missing dependencies') +
                '\n\nMake sure ' + chalk.yellow.bold('PHP') + ' and ' +
                chalk.yellow.bold('Composer') + ' are installed \nand added to your $PATH environment variable.\nThen run ' + chalk.yellow.bold('composer install') +
                ' to install the required Slim dependencies.' +
                chalk.red('\n===================================================================');

                console.log(missingMsg);
            } else {
                slimInstall.callback = function () {
                    this.spawnCommand('composer', ['install']);
                    //this.spawnCommand('grunt', ['build']);
                }.bind(this);
                console.log('\nPlease run ' + chalk.yellow.bold('grunt') + ' after the installation!' );
            }
            this.installDependencies(slimInstall);
        });

    },

    askFor: function () {
        var done = this.async();
        var log = this.log;

        if (!this.options['skip-welcome-message']) {
            console.log(this.yeoman);
        }

        this.slimDependencies.forEach(function (depend) {
            var installed = shelljs.which(depend);
            log.write( chalk.gray('... Checking ') + chalk.yellow('%s ... '), depend );
            if (installed) {
                log.ok();
            } else {
                log.error();
            }

        })
        log.write();

        var prompts = [{
            name: 'siteName',
            message: 'Whats the name of the website?',
            default: foldername
        },{
            name: 'author',
            message: 'Who is the creator?',
            default: 'dummy'
        },{
            name: 'serverPort',
            message: 'Whats the webserver port?',
            default: 8080
        }];

        this.prompt(prompts, function (props) {
            this.authHashSecret = randomString({length: 30});
            this.sessionCookieSecret = randomString({length: 30});
            this.siteName = props.siteName;
            this.author = props.author;
            this.serverPort = props.serverPort;

            done();
        }.bind(this));
    },

    directories: function () {
        this.mkdir('app');
        this.mkdir('tmp');
        this.mkdir('tmp/logs');
        this.mkdir('tmp/cache');
        this.mkdir('test');
        this.mkdir('test/jasmine');
        this.mkdir('public');
        this.mkdir('public/js');
        this.mkdir('public/css');
        this.mkdir('public/dev');
        this.mkdir('public/img');
        this.mkdir('app/config');
        this.mkdir('app/models');
        this.mkdir('app/routes');
        this.mkdir('app/src');
        this.mkdir('app/src/less');
        this.mkdir('app/src/hbs');
        this.mkdir('app/src/coffee');
        this.mkdir('app/src/coffee/views');
        this.mkdir('app/src/coffee/models');
        this.mkdir('app/src/coffee/collections');
        this.mkdir('app/views');
        this.mkdir('app/views/errors');
        this.mkdir('app/views/layouts');
    },

    projectfiles: function () {
        this.copy('_package.json', 'package.json');
        this.copy('_gruntfile.js', 'gruntfile.js');
        this.copy('_bowerrc', '.bowerrc');
        this.copy('_bower.json', 'bower.json');
        this.copy('_composer.json', 'composer.json');
        this.copy('_gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
    },

    frontend: function () {
        this.copy('frontend/_index.php', 'public/index.php');
        this.copy('frontend/_htaccess', 'public/.htaccess');
    },

    autoload: function () {
        this.copy('backend/_app.php', 'app/app.php');
        this.copy('backend/_bootstrap.php', 'app/bootstrap.php');
        this.copy('backend/_autoload.php', 'app/autoload.php');
    },

    helpers: function () {
        this.copy('backend/helpers/_Search.php', 'app/helpers/Search.php');
        this.copy('backend/helpers/_AuthHash.php', 'app/helpers/Authhash.php');
    },

    routes: function () {
        this.copy('backend/routes/_index.php', 'app/routes/index.php');
    },

    tests: function () {
        this.copy('backend/test/jasmine/testSpec.js', 'test/jasmine/testSpec.js')
    },

    coffeeScript: function () {
        this.copy('backend/src/coffee/_app.coffee', 'app/src/coffee/app.coffee');
        this.copy('backend/src/coffee/views/_viewTest.coffee', 'app/src/coffee/views/viewTest.coffee');
    },

    less: function () {
        this.copy('backend/src/less/_styles.less', 'app/src/less/styles.less');
    },

    hbs: function () {
        this.copy('backend/src/hbs/_head.hbs', 'app/src/hbs/head.hbs');
        this.copy('backend/src/hbs/_config.env.hbs', 'app/src/hbs/config.env.hbs');
    },

    views: function () {
        this.copy('backend/views/_index.twig', 'app/views/index.twig');
        this.copy('backend/views/layouts/_master.twig', 'app/views/layouts/master.twig');
        this.copy('backend/views/layouts/_head.html', 'app/views/layouts/head.html');
        this.copy('backend/views/layouts/_one_column.twig', 'app/views/layouts/one_column.twig');
        this.copy('backend/views/layouts/_breadcrumb.twig', 'app/views/layouts/breadcrumb.twig');
        this.copy('backend/views/layouts/_LICENSE.md', 'app/views/layouts/LICENSE.md');
        this.copy('backend/views/errors/_404.twig', 'app/views/errors/404.twig');
    },


    config: function () {
        this.copy('backend/config/_config.env.php', 'app/config/config.env.php');
        this.copy('backend/config/_config.development.php', 'app/config/config.development.php');
        this.copy('backend/config/_config.production.php', 'app/config/config.production.php');
    },

});

module.exports = SlimGenerator;
