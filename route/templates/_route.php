<?php

$app->get('<%= routeUri %>', function() use ($app) {
	$app->view()->appendData(array('viewName'=>'<%= routeName %>'));
	$app->render('<%= fileName %>.twig');
})->name('<%= routeName %>');