/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var randomString = require('random-string');

describe('slim generator', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('slim:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.editorconfig',
      '.gitignore',
      '.bowerrc',
      'package.json',
      'gruntfile.js',
      'bower.json',
      'composer.json',
      'public/index.php',
      'public/.htaccess',
      'app/app.php',
      'app/bootstrap.php',
      'app/autoload.php',
      'app/helpers/Search.php',
      'app/helpers/Authhash.php',
      'app/routes/index.php',
      'test/jasmine/testSpec.js',
      'app/src/coffee/app.coffee',
      'app/src/coffee/views/viewTest.coffee',
      'app/src/less/styles.less',
      'app/src/hbs/head.hbs',
      'app/src/hbs/config.env.hbs',
      'app/views/index.twig',
      'app/views/layouts/master.twig',
      'app/views/layouts/head.html',
      'app/views/layouts/one_column.twig',
      'app/views/layouts/breadcrumb.twig',
      'app/views/layouts/LICENSE.md',
      'app/views/errors/404.twig',
      'app/config/config.env.php',
      'app/config/config.development.php',
      'app/config/config.production.php'

    ];

    helpers.mockPrompt(this.app, {
      siteName: 'Slim Generator',
      authHashSecret: randomString({length: 30}),
      sessionCookieSecret: randomString({length: 30}),
      author: 'Katja Lutz',
      serverPort: 80
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
