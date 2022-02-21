<?php

use WHMCS\Authentication\CurrentUser;
use WHMCS\ClientArea;
use WHMCS\Database\Capsule;

define('CLIENTAREA', true);
if (file_exists(__DIR__ . '/init.php')) {
    require 'init.php';
} else {
    require '../init.php';
}
if (isset($_REQUEST['pid'])) {
    $pid = $_REQUEST['pid'];
} else {
    redir('', 'index.html');
}

require ROOTDIR . "/includes/orderfunctions.php";
require ROOTDIR . "/includes/configoptionsfunctions.php";
require ROOTDIR . "/includes/customfieldfunctions.php";
if (!function_exists('wssstr_replace_first')) {

    function wssstr_replace_first($search, $replace, $source)
    {

        $explode = explode($search, $source);
        $shift = array_shift($explode);
        $implode = implode($search, $explode);
        return $shift . $replace . $implode;
    }
}

$orderfrm = new WHMCS\OrderForm();
$productinfo = $orderfrm->setPid($pid);
if (!$productinfo) {
    redir('', 'index.html');
}

$prdouct_desc = explode( '<br', $productinfo['description']);

$productinfo['shortDescription'] = $prdouct_desc[0];

if (isset($_POST['setdata'])) {
    $data = html_entity_decode($_POST['setdata']);
    $arr = json_decode($data, TRUE);
    if (!is_array($arr)) {
        echo 'InvalidRequest';
        exit();
    }
    $cycle = '';
    $configs = [];
    $addons = [];
    $customfields = [];
    foreach ($arr as $key => $value) {
        if (isset($value['cycle']) && $value['cycle'] != '') {
            $cycle = $value['cycle'];
        }
        if (isset($value['selectedproduct']) && $value['selectedproduct'] != '') {
            $configs[$value['selectedproduct']] = $value['selectedproductvalue'];
        }
        if (isset($value['configid']) && $value['configid'] != '') {
            $configs[$value['configid']] = $value['configvalue'];
        }
        if (isset($value['addonid']) && $value['addonid'] != '') {
            $addons[] = ['addonid' => $value['addonid'], 'qty' => 1];
        }
        if (isset($value['username']) && $value['username'] != '') {
            $customfields[$value['fid']] = $value['username'];
        }
        if (isset($value['connectmethod']) && $value['connectmethod'] == 'subdomain') {
            $customfields[$value['fid']] = $value['connectvalue'];
        }
        if (isset($value['connectmethod']) && $value['connectmethod'] == 'ip') {
            $configs[$value['configid']] = $value['connectvalue'];
        }
        if (isset($value['location']) && $value['location'] != '') {
            $configs[$value['locationid']] = $value['location'];
        }
    }

    unset($_SESSION['cart']);
    $prodarray = array("pid" => $pid, "domain" => [], "billingcycle" => $cycle, "configoptions" => $configs, "customfields" => $customfields, "addons" => $addons, "server" => "");
    $_SESSION["cart"]["products"][] = $prodarray;
    echo 'redirect';
    exit();
}

$wssmarty = new WHMCS\Smarty();
$wssmarty->assign('systemurl', WHMCS\Config\Setting::getValue("systemurl"));
echo $wssmarty->fetch(__DIR__ . '/templates/header.tpl');
$wssmarty->assign('productinfo', $productinfo);
$pricing = getPricingInfo($pid);
foreach ($pricing['cycles'] as $key => $value) {
    $pricing['cycles'][$key] = wssstr_replace_first('USD', '<br><small>', $value) . '</small>';
}
$location = '';
if (isset($_REQUEST['location'])) {
    $location = $_REQUEST['location'];
} else {
    redir('', '../../index.html');
}

$p_images_list = [
    13 => 'grass',
    22 => 'grass',
    15 => 'cobble',
    23 => 'cobble',
    16 => 'stone',
    24 => 'stone',
    17 => 'coal',
    25 => 'coal',
    18 => 'iron',
    26 => 'iron',
    19 => 'gold',
    27 => 'gold',
    20 => 'lapis',
    28 => 'lapis',
    21 => 'emerald',
    29 => 'emerald'
];

$p_image = 'https://spherosolutions.net/assets/img/tiers/'. $p_images_list[$pid] .'.png';

$wssmarty->assign('productImg', $p_image);

$wssmarty->assign('pricing', $pricing);
$configurableoptions = getCartConfigOptions($pid, [], $pricing['minprice']['cycle'], "", true);
$locationvalid = false;

foreach ($configurableoptions as $key => $value) {
    if ($value['optionname'] == 'MySQL Database') {
        $wssmarty->assign('mysqldatabase', $value);
    }
    if ($value['optionname'] == 'Unlimited Player Slots') {
        $value['options'][0]['name'] = str_replace('Yes + ', '', $value['options'][0]['name']);
        $wssmarty->assign('unlimitedslots', $value);
    }
    if ($value['optionname'] == 'Server Type') {
        $wssmarty->assign('servers', $value);
    }
    if ($value['optionname'] == 'Dedicated IP') {
        $wssmarty->assign('dedicatedip', $value);
    }
    if ($value['optionname'] == 'Server Location') {
        foreach ($value['options'] as $okey => $ovalue) {
            if ($ovalue['id'] == $location) {
                $wssmarty->assign('locationid', $value['id']);
                $wssmarty->assign('location', $ovalue);
                $locationvalid = true;
            }
        }
    }
}

if ($locationvalid === false) {
    redir('', 'index.html');
}

$sever = 1;
$servertps = [];
foreach ($configurableoptions as $key => $value) {
    if ($value['optionname'] == 'Server Type') {
        $sever = $value['id'];
        foreach ($value['options'] as $key => $value) {
            $groups = explode(':', $value['name']);
            $servertps[$groups[0]][] = [
                'id' => $value['id'],
                'name' => $groups[1],
            ];
        }
    }
}
foreach ($servertps as $key => $value) {
    if ($servertps[$key][0]['name'] == '') {
        unset($servertps[$key]);
        continue;
    }
    if (count($value) == 1) {
        $servertps[$key][0]['name'] = $key . ': ' . $servertps[$key][0]['name'];
    }
}

$wssmarty->assign('serverid', $sever);
$wssmarty->assign('servers', $servertps);
$wssmarty->assign('productconfigs', $configurableoptions);
$customfields = getCustomFields("product", $pid, "", "", "on", []);

foreach ($customfields as $key => $value) {
    if ($value['textid'] == 'minecraftusername') {
        $wssmarty->assign('usernameid', $value['id']);
    }
    if ($value['textid'] == 'subdomain') {
        $wssmarty->assign('subdomainid', $value['id']);
    }
}

$wssmarty->assign('customfields', $customfields);
$addonsarray = getAddons($pid, []);
$wssmarty->assign('addons', $addonsarray);

echo $wssmarty->fetch(__DIR__ . '/templates/order.tpl');
echo $wssmarty->fetch(__DIR__ . '/templates/footer.tpl');
