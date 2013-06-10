<?php

namespace app;

//Load app autoloader
require 'autoload.php';

//Load environment configs
require 'config/config.production.php';
require 'config/config.development.php';

//Load routes
require 'routes/index.php';