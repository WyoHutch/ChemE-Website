<?php

$conn = mysqli_connect('localhost', 'root', 'laramie', "chemtest") or die(mysqli_connect_error());
$sql = "SELECT * FROM upgrades WHERE AppNum=2012 and PayPalIPN IS NULL";
//	echo $sql."<br>";
$qryresult = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($qryresult);
$upemail = $row[2];
echo $upemail . "<br>";
$ugPwd = $row[4];
echo $ugPwd . "<br>";
$sql = "UPDATE upgrades SET PayPalIPN='" . $txn_id . "', Price=" . $payment_amount . " WHERE AppNum=" . $item_number . " and PayPalIPN IS NULL";
echo $sql . "<br>";
mysqli_query($conn, $sql);
mysqli_close($conn);
