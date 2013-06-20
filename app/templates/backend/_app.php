<?php

namespace app;


chdir ('../app/');

//Register lib autoloader
require '../composer_modules/autoload.php';
use RedBean_Facade as R;

// Prepare app

require 'config/config.env.php';

$app = new \Slim\Slim(array(
	'mode' => $env,
	'view' => new \Slim\Extras\Views\Twig(),
	'templates.path' => '../app/views',
	'log.level' => 4,
	'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter(array(
		'path' => '../logs',
		'name_format' => 'y-m-d'
	))
));

$app->add(new \Slim\Middleware\SessionCookie(array(
    'expires' => '20 minutes',
    'path' => '/',
    'domain' => null,
    'secure' => false,
    'httponly' => false,
    'name' => 'slim_session',
    'secret' => 'AddYourSecretHere',
    'cipher' => MCRYPT_RIJNDAEL_256,
    'cipher_mode' => MCRYPT_MODE_CBC
)));

//Loads all needed subfiles
require 'bootstrap.php';

//Load 404 Route
$app->notFound(function () use ($app) {
	$request = $app->request();
	$requesturi = 'http://'.$_SERVER["HTTP_HOST"].$request->getRootUri().$request->getResourceUri();
	$app->view()->appendData(array('viewName'=>'Page not found','requesturi'=>$requesturi));
    $app->render('errors/404.twig');
});

// Prepare view
\Slim\Extras\Views\Twig::$twigOptions = array (
	'charset' => 'utf-8',
	'cache' => $app->config('cache'),
	'auto_reload' => false,
	'strict_variables' => false,
	'autoescape' => true
);

\Slim\Extras\Views\Twig::$twigExtensions = array (
	'Twig_Extensions_Slim'
);

$app->view()->setData(array('menu'=>array(
	'Home',
	),
));

//Run
$app->run();