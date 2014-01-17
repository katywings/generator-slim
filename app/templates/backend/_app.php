<?php

namespace app;
use RedBean_Facade as R;
date_default_timezone_set("UTC");

chdir ('../app/');

//Register lib autoloader
require '../composer_modules/autoload.php';

// Prepare app
require 'config/config.env.php';

$app = new \Slim\Slim(array(
	'mode' => $env,
	'view' => new \Slim\Views\Twig(),
	'templates.path' => '../app/views'
));

$app->add(new \Slim\Middleware\SessionCookie(array(
    'expires' => '20 minutes',
    'path' => '/',
    'domain' => null,
    'secure' => false,
    'httponly' => false,
    'name' => 'slim_session',
    'secret' => '<%= sessionCookieSecret %>',
    'cipher' => MCRYPT_RIJNDAEL_256,
    'cipher_mode' => MCRYPT_MODE_CBC
)));

//Loads all needed subfiles
require 'bootstrap.php';

// Prepare view
$app->view->parserOptions = array(
    'debug' => true,
    'cache' => $app->config('cache'),
);
$app->view->parserExtensions = array(
    new \Slim\Views\TwigExtension(),
);

//Load 404 Route
$app->notFound(function () use ($app) {
	$request = $app->request();
	$requesturi = 'http://'.$_SERVER["HTTP_HOST"].$request->getRootUri().$request->getResourceUri();
	$app->view->appendData(array('viewName'=>'Page not found','requesturi'=>$requesturi));
    $app->render('errors/404.twig');
});

$app->view->setData(array('menu'=>array(
    'Home',
    ),
));

//Run
$app->run();
R::close();
