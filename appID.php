<?php
  $appnum = $_REQUEST["q"];
  $conn = mysqli_connect('localhost', 'chemesof_admin', 'Wyo4Hutch!', "chemesof_db") or die(mysqli_connect_error());
  $sql = "SELECT * FROM AppData WHERE AppNum = '" . $appnum . "'";
  $qryresult = mysqli_query($conn, $sql);
  mysqli_close($conn);
  echo $qryresult
