<?php
$eaddr = $_REQUEST["email"];
$apd = $_REQUEST["appid"];

$empwd = "EMPTY";
$ampos = strpos($eaddr, "@");
$emname = substr($eaddr, 0, $ampos);
$emname = strtolower($emname);
if (strlen($emname) < 3) {
    $emname = $emname . "az";
}
$domname = substr($eaddr, $ampos + 1);
$domname = strtolower($domname);
$char1 = chr(fmod((ord($domname[0]) + strlen($domname)), 26) + 65);
$char2 = chr(fmod((ord($emname[0]) + strlen($emname)), 10) + 48);
$char3 = chr(fmod((ord($domname[0]) + ord($apd[0])), 26) + 65);
$char4 = chr(fmod((ord($emname[0]) + ord($apd[1])), 10) + 48);
$char5 = chr(fmod((ord($domname[1]) + ord($apd[2])), 26) + 65);
$char6 = chr(fmod((ord($emname[1]) + ord($apd[3])), 10) + 48);
$empwd = $char1 . $char2 . $char3 . $char4 . $char5 . $char6;
echo $empwd;
