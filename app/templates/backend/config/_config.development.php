<?php

use RedBean_Facade as R;

if($env == 'development'){
	R::setup('sqlite:../tmp/db.sqlite','user','password');
}

$app->configureMode('development', function () use ($app) {
    $app->config(array(
        'log.enabled' => true,
        'debug' => true,
        'cache' => false,
    ));
});