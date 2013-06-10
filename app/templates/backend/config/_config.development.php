<?php

$app->configureMode('development', function () use ($app) {
    $app->config(array(
        'log.enabled' => true,
        'debug' => true,
        'cache' => false,
    ));
});