function downLoad(appNum) {
  xmlhttp.open("GET", "download.php?q=" + appNum.toString(), true);
  xmlhttp.send();
}

function getAppID(appNum) {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      appID = this.responseText;
    }
  xhttp.open("GET", "appID.php?q=" + appNum.toString(), true);
  xhttp.send();
  return appID
}

function upgrdApp(appNum, paybool) {
  var userEM = prompt(
    "Please Enter E-mail address to receive PASSWORD for App Upgrade"
  );
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(userEM)) {
    alert("No or INVALID E-mail Address Entered");
    return false;
  } else {
    if (paybool) {
      appID = getAppID(appNum);
      paidPwd = genPwd(userEM, appID);
      xhttp.open("GET", "upgrddb.php?email=userEM&appnum=appNum&ugpwd=paidPwd", true);
      xhttp.send();
      alert("Connecting to PayPal website for Order submittal");
    } else {
      freePwd = genPwd(userEM, "G0A0");
      sendPwd(userEM, freePwd);
    }
  }
}

function genPwd(email, appID) {
  emAddr = email.toLowerCase();
  posAt = emAddr.indexOf("@");
  emName = emAddr.slice(0, posAt);
  emDom = emAddr.substring(posAt + 1);
  posDm = emDom.indexOf(".");
  emDomNm = emDom.slice(0, posDm);
  char1 = String.fromCharCode(
    ((emDomNm.charCodeAt(0) + emDom.length) % 26) + 65
  );
  char2 = String.fromCharCode(
    ((emName.charCodeAt(0) + emName.length) % 10) + 48
  );
  char3 = String.fromCharCode(
    ((emDomNm.charCodeAt(0) + appID.charCodeAt(0)) % 26) + 65
  );
  char4 = String.fromCharCode(
    ((emName.charCodeAt(0) + appID.charCodeAt(1)) % 10) + 48
  );
  char5 = String.fromCharCode(
    ((emDomNm.charCodeAt(1) + appID.charCodeAt(2)) % 26) + 65
  );
  char6 = String.fromCharCode(
    ((emName.charCodeAt(1) + appID.charCodeAt(3)) % 10) + 48
  );
  return char1 + char2 + char3 + char4 + char5 + char6;
}

function sendPwd(emClient, freePwd) {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ghutchwyo14@gmail.com",
      pass: "WyoHutch4!"
    }
  });
  var mailOptions = {
    from: "ghutchwyo14@gmail.com",
    to: emClient,
    subject: "Conversions App Free Upgrade Password",
    text:
      "Thank you for using the Conversions app. To upgrade, open the app and click UPGRADE, " +
      "enter your e-mail address (" +
      emClient +
      ") and password (" +
      freePwd
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      alert("E-mail with Password sent");
    }
  });
}
