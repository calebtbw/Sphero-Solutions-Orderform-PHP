<?php

if (isset($_REQUEST['id']) && is_numeric($_REQUEST['id']) && file_exists(__DIR__ . '/assets/img/servertypes/' . $_REQUEST['id'] . '.png')) {
    header('Content-Type: image/x-png'); //or whatever
    readfile(__DIR__ . '/assets/img/servertypes/' . $_REQUEST['id'] . '.png');
    die();
} else {
    header('Content-Type: image/x-png'); //or whatever
    readfile(__DIR__ . '/assets/img/servertypes/default.png');
    die();
}