<?php
$email = $_REQUEST["email"];
$appnum = $_REQUEST["appnum"];
$ugpwd = $_REQUEST["ugpwd"];
$sql = "INSERT INTO Upgrades (ugEmail, AppNum, ugPwd) VALUES ('" . $email . "', " . $appnum . ", '" . $ugpwd . "')";
$conn = mysqli_connect('localhost', 'chemesof_admin', 'Wyo4Hutch!', "chemesof_db") or die(mysqli_connect_error());
$qryresult = mysqli_query($conn, $sql);
mysqli_close($conn);
