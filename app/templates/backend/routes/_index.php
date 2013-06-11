<?php
namespace app\routes;

$app->get('/', function() use ($app) {
	$app->view()->appendData(array('viewName'=>'Home'));
	$app->render('index.twig');
})->name('Home');