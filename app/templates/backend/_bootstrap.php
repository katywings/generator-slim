<?php

namespace app;

//Load app autoloader
require 'autoload.php';

//Load environment configs
require 'config/config.production.php';
require 'config/config.development.php';

//Load routes
foreach (glob("routes/*.php") as $filename)
{
    require $filename;
}