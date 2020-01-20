<?php
$upemail = $_REQUEST["q"];
$ugPwd = $_REQUEST["p"];
$reqa = "Thank you for using the Conversions app. To unlock full functionality, open the app and click UPGRADE, ";
$reqb = "enter your e-mail address (" . $upemail . ") and password." . PHP_EOL;
$reqc = "UPGRADE PASSWORD -  " . $ugPwd . PHP_EOL . PHP_EOL;
$reqz = wordwrap($reqa . $reqb . $reqc, 60);

$mail_From    = "From: upgrade@chemesoftstore.com";
$mail_To      = $upemail;
$mail_Subject = "ChemE Soft Store Conversions App Upgrade Password";
$mail_Body    = $reqz;
mail($mail_To, $mail_Subject, $mail_Body, $mail_From);
