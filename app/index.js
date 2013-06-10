'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;

var SlimGenerator = module.exports = function SlimGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SlimGenerator, yeoman.generators.Base);

SlimGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  },{
    name: 'siteName',
    message: 'Wie soll die Website heissen?'
  },{
    name: 'author',
    message: 'Wie heisst der Autor des Projekts?'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.someOption = (/y/i).test(props.someOption);
    this.siteName = props.siteName;
    this.author = props.author;

    cb();
  }.bind(this));
};

SlimGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('cache');
  this.mkdir('logs');
  this.mkdir('app/public');
  this.mkdir('app/config');
  this.mkdir('app/models');
  this.mkdir('app/routes');
  this.mkdir('app/views');
  this.mkdir('app/views/errors');
  this.mkdir('app/views/layouts');

  //Copy Info Files
  this.copy('_package.json', 'package.json');
  this.copy('_gruntfile.js', 'gruntfile.js');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('_composer.json', 'composer.json');

  this.copy('frontend/_index.php', 'app/public/index.php');
  this.copy('frontend/_htaccess', 'app/public/.htaccess');

  //App Ressources
  this.copy('backend/_app.php', 'app/app.php');
  this.copy('backend/_bootstrap.php', 'app/bootstrap.php');
  this.copy('backend/_autoload.php', 'app/autoload.php');

  //Copy Helpers
  this.copy('backend/helpers/_Search.php', 'app/helpers/Search.php');
  this.copy('backend/helpers/_AuthHash.php', 'app/helpers/Authhash.php');

  //Copy Routes
  this.copy('backend/routes/_index.php', 'app/routes/index.php');

  //Copy Views
  this.copy('backend/views/_index.twig', 'app/views/index.twig');
  this.copy('backend/views/layouts/_master.twig', 'app/views/layouts/master.twig');
  this.copy('backend/views/layouts/_one_column.twig', 'app/views/layouts/one_column.twig');
  this.copy('backend/views/layouts/_breadcrumb.twig', 'app/views/layouts/breadcrumb.twig');
  this.copy('backend/views/layouts/_LICENSE.md', 'app/views/layouts/LICENSE.md');  
  this.copy('backend/views/errors/_404.twig', 'app/views/errors/404.twig');

  this.copy('backend/config/_config.development.php', 'app/config/config.development.php');
  this.copy('backend/config/_config.production.php', 'app/config/config.production.php');

  this.fetch('https://getcomposer.org/composer.phar', 'composer.phar', function (err) {
    if (err) {
      return done(err);
    }
    exec('php composer.phar install');
  });
};

SlimGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
