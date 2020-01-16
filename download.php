<?php
$appnum = $_REQUEST["q"];
$sql = "INSERT INTO Downloads (AppNum) VALUES ('" . $appnum . "')";
$conn = mysqli_connect('localhost', 'chemesof_admin', 'Wyo4Hutch!', "chemesof_db") or die(mysqli_connect_error());
$qryresult = mysqli_query($conn, $sql);
mysqli_close($conn);
