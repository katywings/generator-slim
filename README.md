# Generator-slim
[![Build Status](https://secure.travis-ci.org/katywings/generator-slim.png)](https://travis-ci.org/katywings/generator-slim)

Maintainer: [Katja Lutz](https://github.com/katywings)

This yeoman generator sets up a PHP Project including [Slim Framework](http://www.slimframework.com), all needed configs to begin with developing and several grunt tasks. Yes its a PHP Project Generator and automatically downloads composer and several php libs.

(based on the yeoman [generator-generator](https://github.com/yeoman/generator-generator))

For the client part, ive included Backbone and Marionette. Coffeescript and Less are integrated in app/src and automatically builded and minified into the public folder.

## Getting started
* Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
* Install the generator: `npm install -g generator-slim`
* Run: `yo slim`

## What do you get?
The following directory structure do you get:

    .
    ├── .bowerrc
    ├── .editorconfig
    ├── .gitignore
    ├── app
    │   ├── app.php
    │   ├── autoload.php
    │   ├── bootstrap.php
    │   ├── config
    │   │   ├── config.development.php
    │   │   ├── config.env.php
    │   │   └── config.production.php
    │   ├── helpers
    │   │   ├── Authhash.php
    │   │   └── Search.php
    │   ├── models
    │   ├── routes
    │   │   └── index.php
    │   ├── src
    │   │   ├── coffee
    │   │   │   ├── app.coffee
    │   │   │   └── views
    │   │   │       └── viewTest.coffee
    │   │   ├── hbs
    │   │   │   ├── config.env.hbs
    │   │   │   └── head.hbs
    │   │   └── less
    │   │       └── styles.less
    │   └── views
    │       ├── errors
    │       │   └── 404.twig
    │       ├── index.twig
    │       └── layouts
    │           ├── LICENSE.md
    │           ├── breadcrumb.twig
    │           ├── head.html
    │           ├── master.twig
    │           └── one_column.twig
    ├── bower.json
    ├── bower_modules
    ├── cache
    ├── composer.json
    ├── composer.lock
    ├── composer.phar
    ├── composer_modules
    │   ├── autoload.php
    │   └── composer
    │       ├── ClassLoader.php
    │       ├── autoload_classmap.php
    │       ├── autoload_namespaces.php
    │       ├── autoload_real.php
    │       └── installed.json
    ├── gruntfile.js
    ├── logs
    ├── node_modules
    └── public
        ├── .htaccess
        ├── css
        ├── dev
        ├── img
        ├── index.php
        └── js

## Features

### Basic
* All what you need for fast developing in PHP and Coffescript
* Several optimized grunt tasks
* Ready after install: start `grunt server` and you`re ready for development
* Yeah git init was started at the installation ;) 

### Server Side
* PHP Basic Setup
* Slim Framework Configured
* Development / Production Settings
* [Twig](http://twig.sensiolabs.org)
* Templates (master layout based on h5b, one-column, breadcrumb, 404 error)
* [PHP Mailer](https://github.com/Synchro/PHPMailer)
* [RedBeanPHP](http://redbeanphp.com)
* Several PHP Helper Classes (AuthHash Class, Search Class: File-based search Crawler)
* Sub Generator for Routes `yo slim:route`

### Client Side
* New: Jasmine Testing
* jQuery
* Underscore
* Moment
* Backbone
* Backbone.Marionette
* Less and Coffeescript Automatic Compilation, Integration and Livereload

## Server Setup
### Basic
The generator comes with a included server for php. For faster development, I added a watcher with build at change and livereload.

* PHP 5.4 is prerequired! Install it first, example: [mac](http://php-osx.liip.ch)
* Change the hashes in *app/app.php*, *app/helpers/authHash.php*
* Change the sqlite and mysql Configs in *app/config/* to your needs
* Run: `grunt server` *The server runs in development!*
* Run: `grunt server:production` to launch the production server

### Manual Installation
If you don't wanna use the included grunt server, you can use any Apache/PHP Webserver. To get your webserver to work with the project you need to change the following things:

* Setup your Apache Webserver DocumentRoot to *public/*
* Run: `grunt`
* And to start the watcher: `grunt watch`

## Environments
Thanks to the included server you often really doesnt need the following commands. But if you use an own Apache, PHP Server you need these commands to switch between the environments!

### Development
All Script and CSS Files are served in full length, no uglifying. PHP View Files doesnt get cached. Livereload is active. SQlite is the active database.

* Run: `grunt` or `grunt development` to switch development

### Production
Script and CSS Files are served minified. No livereload! MySQL is the active database.

* Run: `grunt production` to switch to production

## Further Grunt Tasks
### Jasmine testing
* Create your Jasmine Tests in the folder *test/jasmine/*
* Run: `grunt test` to start the jasmine tests

### Building dist
The generated distribution includes just the needed files and is as small as possible. 

* Run: `grunt dist` to generate the dist
* `grunt dist` changes automatically to production, run `grunt` if you wanna change back to development!

### Fetching npm and bower modules
* Run: `grunt fetch`

## Changelog
* 0.10.1
    * Updated to Yeoman Generator 0.12.0

* 0.10.0
    * Added automatic App Secret and AuthHash generation
    * Added Database Switch between Development (Sqlite) and Production (MySQL)
    * Added Directory *tmp* including *cache* and *Sqlite Database* added
    * Removed chown command (obsolete)
    * Bug: Readme not fully compatible with npmjs.org, is fixed
    * Bug: no Sitename on 404 Template, is fixed
    * Bug: Watcher breaks after several ticks, is fixed

* 0.9.9
    * Added Jasmine Testing

* 0.9.8
    * Extended the manual including the directory structure, features and new tips and tricks
    * Corrected Bug: 404 error template wasnt loading correctly
    * Changes in Gruntfile
        * Bug: when running `grunt server`, the Browser started before the server was ready, is fixed
        * Bug: `grunt server` creates dist folder, is fixed
        * Added Feature: uglifying of javascript lib
    * English translation of 404 error template, and added some styling
    * English translation of subgenerator:Route

* 0.9.x
    * Description is coming :P

* 0.9.0
    * First release

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
