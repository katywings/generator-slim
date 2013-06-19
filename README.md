# Generator-slim
[![Build Status](https://secure.travis-ci.org/katywings/generator-slim.png)](https://travis-ci.org/katywings/generator-slim)

This yeoman generator sets up a PHP Project including [Slim Framework](http://http://www.slimframework.com), all needed configs to begin with developing and several grunt tasks. Yes its a PHP Project Generator and automatically downloads composer and several php libs for fast prototyping.

(based on the yeoman [generator-generator](https://github.com/yeoman/generator-generator))

For the client part, ive included Backbone and Marionette. Coffeescript and Less are integrated in app/src and automatically builded and minified into the public folder.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `sudo npm install -g yo`
- Install the generator: `sudo npm install -g generator-slim`
- Run: `sudo yo slim`

## Server Setup
### Basic
The generator comes with a included server for php. For faster development, I added a watcher with build at change and livereload.
- PHP 5.4 is prerequired! Install it first
	- [mac](http://php-osx.liip.ch)
- Run: `grunt server`

### Manual Installation
If you don't wanna use the included grunt server, you can use any Apache/PHP Webserver. To get your webserver to work with the project you need to change the following things:
- Setup your Apache Webserver DocumentRoot to "public/"
- Run: `grunt`
- And to start the watcher: `grunt watch`

## Switch between development and production
- Run: `grunt production` to switch to production
- Run: `grunt` or `grunt development` to switch back to development

## Further Grunt Tasks
### Building dist
The generated distribution includes just the needed files and is as small as possible. 
- Run: `grunt dist` to generate the dist
- `grunt dist` changes automatically to production, run `grunt` if you wanna change back to development!

### Fetching npm and bower modules
- Run: `sudo grunt fetch`, WARNING: The downloaded files will have System as Owner!

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
