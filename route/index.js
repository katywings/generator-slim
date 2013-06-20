'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var RouteGenerator = module.exports = function RouteGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the route subgenerator with the argument ' + this.name + '.');
};

util.inherits(RouteGenerator, yeoman.generators.NamedBase);

RouteGenerator.prototype.askFor = function askFor() {
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
    name: 'routeName',
    message: 'Whats the name of the new route',
    default: 'dummy'
  },{
    name: 'routeUri',
    message: 'Whats the URI? (example: /contact)',
    default: '/'
  },{
    name: 'fileName',
    message: 'How should I name the generated files?',
    default: 'dummy'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.routeName = props.routeName;
    this.routeUri = props.routeUri;
    this.fileName = props.fileName;

    cb();
  }.bind(this));
};

RouteGenerator.prototype.files = function files() {
  this.copy('_route.php', 'app/routes/' + this.fileName + '.php');
  this.copy('_view.twig', 'app/views/' + this.fileName + '.twig');
};
