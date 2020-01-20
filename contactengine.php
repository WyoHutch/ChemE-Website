<?php

$Name = Trim(stripslashes($_POST['Name']));
$Email = Trim(stripslashes($_POST['Email']));
$App = Trim(stripslashes($_POST['App']));
$Message = Trim(stripslashes($_POST['Message']));
$EmailTo = "admin@chemesoftstore.com";
$Subject = "Contact Form Concerning - " . $App;

// validation
$validationOK = true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "App- ";
$Body .= $App;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$Email>");

// redirect to success page 
if ($success) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
} else {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
