<?php

$app->configureMode('production', function () use ($app) {
    $app->config(array(
        'log.enabled' => true,
        'debug' => false,
        'cache' => realpath('../../cache')
    ));
});