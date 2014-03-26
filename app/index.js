'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
//var execSync = require('exec-sync');
var randomString = require('random-string');
var foldername = path.basename(process.cwd());

var SlimGenerator = module.exports = function SlimGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.options = options;
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SlimGenerator, yeoman.generators.Base);

SlimGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  console.log(this.yeoman)
  console.log('\n Please run "grunt" after the installation!'.red);
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
};

SlimGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('tmp');
  this.mkdir('tmp/logs');
  this.mkdir('tmp/cache');
  this.mkdir('bower_modules');
  this.mkdir('node_modules');
  this.mkdir('composer_modules');
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

  //Copy Info Files
  this.copy('_package.json', 'package.json');
  this.copy('_gruntfile.js', 'gruntfile.js');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('_composer.json', 'composer.json');
  this.copy('_gitignore', '.gitignore');

  this.copy('frontend/_index.php', 'public/index.php');
  this.copy('frontend/_htaccess', 'public/.htaccess');

  //App Ressources
  this.copy('backend/_app.php', 'app/app.php');
  this.copy('backend/_bootstrap.php', 'app/bootstrap.php');
  this.copy('backend/_autoload.php', 'app/autoload.php');

  //Copy Helpers
  this.copy('backend/helpers/_Search.php', 'app/helpers/Search.php');
  this.copy('backend/helpers/_AuthHash.php', 'app/helpers/Authhash.php');

  //Copy Routes
  this.copy('backend/routes/_index.php', 'app/routes/index.php');

  //Copy Tests
  this.copy('backend/test/jasmine/testSpec.js', 'test/jasmine/testSpec.js')

  //Copy Coffeescript Sample Files
  this.copy('backend/src/coffee/_app.coffee', 'app/src/coffee/app.coffee');
  this.copy('backend/src/coffee/views/_viewTest.coffee', 'app/src/coffee/views/viewTest.coffee');

  //Copy Less Sample Files
  this.copy('backend/src/less/_styles.less', 'app/src/less/styles.less');

  this.copy('backend/src/hbs/_head.hbs', 'app/src/hbs/head.hbs');
  this.copy('backend/src/hbs/_config.env.hbs', 'app/src/hbs/config.env.hbs');

  //Copy Views
  this.copy('backend/views/_index.twig', 'app/views/index.twig');
  this.copy('backend/views/layouts/_master.twig', 'app/views/layouts/master.twig');
  this.copy('backend/views/layouts/_head.html', 'app/views/layouts/head.html');
  this.copy('backend/views/layouts/_one_column.twig', 'app/views/layouts/one_column.twig');
  this.copy('backend/views/layouts/_breadcrumb.twig', 'app/views/layouts/breadcrumb.twig');
  this.copy('backend/views/layouts/_LICENSE.md', 'app/views/layouts/LICENSE.md');  
  this.copy('backend/views/errors/_404.twig', 'app/views/errors/404.twig');

  this.copy('backend/config/_config.env.php', 'app/config/config.env.php');
  this.copy('backend/config/_config.development.php', 'app/config/config.development.php');
  this.copy('backend/config/_config.production.php', 'app/config/config.production.php');
};

SlimGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};

SlimGenerator.prototype.install = function (){
  if(this.options['skip-install']){
    return;
  }
  var done = this.async();
  this.installDependencies({ skipInstall: this.options['skip-install']});
  this.fetch('https://getcomposer.org/composer.phar', '', function (err) {
    if (err) {
      return done(err);
    }
    exec('php composer.phar install');
    exec('git init');
    done();
  });
}
