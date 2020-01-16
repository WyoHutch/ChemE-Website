<?php

// STEP 1: read POST data

// Reading POSTed data directly from $_POST causes serialization issues with array data in the POST.
// Instead, read raw POST data from the input stream.
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
    $keyval = explode('=', $keyval);
    if (count($keyval) == 2)
        $myPost[$keyval[0]] = urldecode($keyval[1]);
}
// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
$req = 'cmd=_notify-validate';
if (function_exists('get_magic_quotes_gpc')) {
    $get_magic_quotes_exists = true;
}
foreach ($myPost as $key => $value) {
    if ($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
        $value = urlencode(stripslashes($value));
    } else {
        $value = urlencode($value);
    }
    $req .= "&$key=$value";
}

// STEP 2: POST IPN data back to PayPal to validate

// $ch = curl_init('https://ipnpb.sandbox.paypal.com/cgi-bin/webscr');
$ch = curl_init('https://ipnpb.paypal.com/cgi-bin/webscr');
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

// In wamp-like environments that do not come bundled with root authority certificates,
// please download 'cacert.pem' from "http://curl.haxx.se/docs/caextract.html" and set
// the directory path of the certificate as shown below:
// curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
if (!($res = curl_exec($ch))) {
    // error_log("Got " . curl_error($ch) . " when processing IPN data");
    curl_close($ch);
    exit;
}
curl_close($ch);

// STEP 3: Inspect IPN validation result and act accordingly

if (strcmp($res, "VERIFIED") == 0)
// The IPN is verified, process it:
// check whether the payment_status is Completed
// check that txn_id has not been previously processed
// check that receiver_email is your Primary PayPal email
// check that payment_amount/payment_currency are correct
// process the notification
{

    // assign posted variables to local variables
    $item_name = $_POST['item_name'];
    $item_number = $_POST['item_number'];
    $payment_status = $_POST['payment_status'];
    $payment_amount = $_POST['mc_gross'];
    $payment_currency = $_POST['mc_currency'];
    $txn_id = $_POST['txn_id'];
    $receiver_email = $_POST['receiver_email'];
    $payer_email = $_POST['payer_email'];


    // IPN message values depend upon the type of notification sent.
    // To loop through the &_POST array and print the NV pairs to the screen:
    //foreach($_POST as $key => $value) {
    //echo $key." = ". $value."<br>";}

    $conn = mysqli_connect('localhost', 'root', 'laramie', "chemtest") or die(mysqli_connect_error());
    $sql = "SELECT * FROM Upgrades WHERE AppNum=" . $item_number . " and PayPalIPN IS NULL";
    $qryresult = mysqli_query($conn, $sql);
    $row = mysqli_fetch_row($qryresult);
    $upemail = $row['UGEmail'];
    $ugPwd = $row['UGPwd'];
    $sql = "UPDATE Upgrades SET PayPalIPN='" . $txn_id . "', Price=" . $payment_amount . " WHERE AppNum=" . $item_number . " and PayPalIPN IS NULL";
    mysqli_query($conn, $sql);
    mysqli_close($conn);

    $appname['1011'] = "Conversions";
    $appname['2011'] = "3 Dimension Vector Math";
    $appname['2012'] = "Cubic and Quartic Root Solver";
    $appname['2013'] = "6x6 Matrix Math";
    $appname['2101'] = "Two Parameter Regression";
    $appname['2102'] = "Polynomial Regression";
    $appname['2103'] = "Multivariable Regression";
    $appname['3011'] = "Fluid Flow Pressure Loss";
    $appname['3012'] = "Fluid Flow Meter Sizing";
    $appname['4011'] = "Six Component Vap-Liq Ideal Mixture Equilibrium";
    $appname['4012'] = "Single Component Equations of State";
    $appname['4013'] = "Multi-Component Equations of State";

    $reqa = "Thank you for the purchase of your upgrade for the " . $appname[$item_number] . " app. To upgrade, open the app and click UPGRADE, ";
    $reqb = "enter your e-mail address (" . $upemail . ") and password." . PHP_EOL;
    $reqc = "UPGRADE PASSWORD -  " . $ugPwd . PHP_EOL . PHP_EOL;
    $reqd = "Your PayPal charge is $" . $payment_amount;
    $reqz = wordwrap($reqa . $reqb . $reqc . $reqd, 60);
    //    echo $reqz;

    //    Send an email to the Customer with Upgrade password
    $mail_From    = "From: upgrade@chemesoftstore.com";
    $mail_To      = $upemail;
    $mail_Subject = "ChemE Soft Store App Upgrade Password";
    $mail_Body    = $reqz;
    mail($mail_To, $mail_Subject, $mail_Body, $mail_From);

    // Authentication protocol is complete - OK to process notification contents

    // Possible processing steps for a payment include the following:

    // Check that the payment_status is Completed
    // Check that txn_id has not been previously processed
    // Check that receiver_email is your Primary PayPal email
    // Check that payment_amount/payment_currency are correct
    // Process payment


} else if (strcmp($res, "INVALID") == 0) {
    // IPN invalid, log for manual investigation
    //echo "The response from IPN was: <b>" .$res ."</b>";
    // Authentication protocol is complete - begin error handling
    $reqa = "Purchase of your upgrade for the " . $appname[$item_number] . " app was not approved by PayPal. ";
    $reqb = "If you wish to continue, you must contact PayPal.com to resolve the issue" . PHP_EOL;
    $reqc = "Uncompleted transaction...";
    $reqz = wordwrap($reqa . $reqb . $reqc, 60);
    //    echo $resz;

    // Send an email announcing the IPN message is INVALID
    $mail_From    = "upgrade@chemesoftstore.com";
    $mail_To      = $upemail;
    $mail_Subject = "ChemE Soft Store App Upgrade PayPal INVALID";
    $mail_Body    = $reqz;

    mail($mail_To, $mail_Subject, $mail_Body, $mail_From);
}
fclose($fp);  // Close the file
