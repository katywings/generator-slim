# Generator-slim
[![Build Status](https://secure.travis-ci.org/katywings/generator-slim.png)](https://travis-ci.org/katywings/generator-slim)

This generator sets up a Slim Project including all needed configs to begin with developing and providing several grunt configs.

**This project is based on the yeoman [generator-generator](https://github.com/yeoman/generator-generator).**

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `sudo npm install -g yo`
- Install the generator: `sudo npm install -g generator-slim`
- Run: `sudo yo slim`

## Webserver Setup
### Basic
The generator comes with a included grunt config to run a basic PHP webserver.
- PHP 5.4 is prerequired! Install it first
	* [mac](http://php-osx.liip.ch)
- Run: `grunt server`

### Manual Installation
If you don't wanna use the included grunt server, you can use any Apache/PHP Webserver. To get your webserver to work with the project you need to change the following things:
- Setup your Apache Webserver DocumentRoot to "public/"
- Run: `grunt`
- Or to start the watcher: `grunt watch`

## Switch between development and production
- Run: `grunt production` to switch to production
- Run: `grunt` or `grunt development` to switch back to development

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
