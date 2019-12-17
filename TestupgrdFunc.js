function dbupgrade(AppID) {
    alert("UpgrdPWD" + AppID.toString())
//   var upwd = prompt(
//     "Please Enter E-mail address to receive PASSWORD for App Upgrade"
//   );
//   var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!filter.test(upwd)) {
//     alert("No or INVALID E-mail Address Entered");
//     return false;
//   } else {
//       if (paybool) {
//           alert("Connecting to PayPal website for Order submittal");

//       } else {
//         alert(empwd(upwd, AppID))
//       }

//   }
}

<?php
//get the Macaddress of Download Client

$mac = new GetMacAddr(PHP_OS);
$macaddr = $mac->mac_addr;
$appno = $_REQUEST['AppNum'];
//$appno = 1011;
//$conn=mysqli_connect("localhost","root","","chemesoft") or die (mysqli_connect_error());
$conn=mysqli_connect('chemesoftstorecom.ipagemysql.com', 'ghutch', 'WyoHutch',"chemesoft") or die (mysqli_connect_error());
$sql = "INSERT INTO downloads (DateTime, MACaddr, AppID) VALUES (Date(\"Y-m-d\"),'".$macaddr."',".$appno.")";
echo $sql;
mysqli_query($conn,$sql);
mysqli_close($conn);

?>

<?php
//echo "Saving to Upgrade Database <br>";
//get the Macaddress of Client
    
    function empwd($eaddr,$apd)
	{
//		echo "EMail: ".$eaddr."   App ID: ".$apd."<br>";
		$empwd="EMPTY";
		$ampos=strpos($eaddr,"@");
		$dotpos=strpos($eaddr,$ampos,'/.');
//		echo "amp pos: ".$ampos."   dot pos: ".$dotpos."<br>";
		$emname=substr($eaddr,0,$ampos);
		$emname=strtolower($emname);
		if (strlen($emname)<3)
		{
			$emname=$emname."az";
		}
//		echo "Email name: ".$emname."<br>";
		$domname=substr($eaddr,$ampos+1);
		$domname=strtolower($domname);
//		echo "Email domain: ".$domname."<br>";
//		echo $domname[0].$domname[1]."<br>";
		$char1=chr(fmod((ord($domname[0])+strlen($domname)),26)+65);
		$char2=chr(fmod(ord($domname[1]),10)+48);
		$char3=chr(fmod((ord($domname[0])+ord($apd[0])),26)+65);
		$char4=chr(fmod((ord($emname[0])+ord($apd[1])+strlen($emname)),10)+48);
		$char5=chr(fmod((ord($emname[1])+ord($apd[2])),26)+65);
		$char6=chr(fmod((ord($emname[2])+ord($apd[3])),10)+48);
		$empwd = $char1.$char2.$char3.$char4.$char5.$char6;
//		echo "EMail Password - ".$empwd."<br>";
		return $empwd;
	}
    
// echo Macaddress of Server
$mac = new GetMacAddr(PHP_OS);
$macaddr = $mac->mac_addr;
$appno = $_REQUEST['AppNum'];
$emaddr = $_REQUEST['UpEmail'];
//$appno = 1011;
//$emaddr = "GHutchinson@Digis.net";
//$conn=mysqli_connect("localhost","root","","chemesoft") or die (mysqli_connect_error());
$conn=mysqli_connect('chemesoftstorecom.ipagemysql.com', 'ghutch', 'WyoHutch',"chemesoft") or die (mysqli_connect_error());
$sql = "SELECT * FROM appdata WHERE AppNum=".$appno;
//echo $sql."<br>";
$qryresult=mysqli_query($conn,$sql);
$row = mysqli_fetch_row($qryresult);
$appid = $row[1];
//$appid="G0A0";
$pwd = empwd($emaddr,$appid);
$sql = "DELETE FROM `upgrades` WHERE `AppID`=".$appno." and `PayPalIPN`=\"\"";
//echo $sql."<br>";
mysqli_query($conn,$sql);
$sql = "INSERT INTO upgrades (UpgrdDT, MACaddr, EMailaddr, AppID, MACPwd) VALUES (Date(\"Y-m-d\"),'".$macaddr."', '".$emaddr."', '".$appno."', '".$pwd."')";
//echo $sql."<br>";
mysqli_query($conn,$sql);
mysqli_close($conn);


?>

<?php
//echo "Saving to Upgrade Database <br>";
//get the Macaddress of Client
    
    function empwd($eaddr,$apd)
	{
//		echo "EMail: ".$eaddr."   App ID: ".$apd."<br>";
		$empwd="EMPTY";
		$ampos=strpos($eaddr,"@");
		$dotpos=strpos($eaddr,$ampos,'/.');
//		echo "amp pos: ".$ampos."   dot pos: ".$dotpos."<br>";
		$emname=substr($eaddr,0,$ampos);
		$emname=strtolower($emname);
		if (strlen($emname)<3)
		{
			$emname=$emname."az";
		}
//		echo "Email name: ".$emname."<br>";
		$domname=substr($eaddr,$ampos+1);
		$domname=strtolower($domname);
//		echo "Email domain: ".$domname."<br>";
//		echo $domname[0].$domname[1]."<br>";
		$char1=chr(fmod((ord($domname[0])+strlen($domname)),26)+65);
		$char2=chr(fmod(ord($domname[1]),10)+48);
		$char3=chr(fmod((ord($domname[0])+ord($apd[0])),26)+65);
		$char4=chr(fmod((ord($emname[0])+ord($apd[1])+strlen($emname)),10)+48);
		$char5=chr(fmod((ord($emname[1])+ord($apd[2])),26)+65);
		$char6=chr(fmod((ord($emname[2])+ord($apd[3])),10)+48);
		$empwd = $char1.$char2.$char3.$char4.$char5.$char6;
//		echo "EMail Password - ".$empwd."<br>";
		return $empwd;
	}
    
// echo Macaddress of Server
$mac = new GetMacAddr(PHP_OS);
$macaddr = $mac->mac_addr;
$appno = $_REQUEST['AppNum'];
$emaddr = $_REQUEST['UpEmail'];
//$appno = 1011;
//$emaddr = "GHutchinson@Digis.net";
//$conn=mysqli_connect("localhost","root","","chemesoft") or die (mysqli_connect_error());
$conn=mysqli_connect('chemesoftstorecom.ipagemysql.com', 'ghutch', 'WyoHutch',"chemesoft") or die (mysqli_connect_error());
$sql = "SELECT * FROM appdata WHERE AppNum=".$appno;
//echo $sql."<br>";
$qryresult=mysqli_query($conn,$sql);
$row = mysqli_fetch_row($qryresult);
$appid = $row[1];
//$appid="G0A0";
$pwd = empwd($emaddr,$appid);
$sql = "DELETE FROM `upgrades` WHERE `AppID`=".$appno." and `PayPalIPN`=\"\"";
//echo $sql."<br>";
mysqli_query($conn,$sql);
$sql = "INSERT INTO upgrades (UpgrdDT, MACaddr, EMailaddr, AppID, MACPwd) VALUES (Date(\"Y-m-d\"),'".$macaddr."', '".$emaddr."', '".$appno."', '".$pwd."')";
//echo $sql."<br>";
mysqli_query($conn,$sql);
mysqli_close($conn);


?>
