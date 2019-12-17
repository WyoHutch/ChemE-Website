function upgrdApp(AppID, paybool) {
  var userEM = prompt(
    "Please Enter E-mail address to receive PASSWORD for App Upgrade"
  );
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(userEM)) {
    alert("No or INVALID E-mail Address Entered");
    return false;
  } else {
    if (paybool) {
      alert("Connecting to PayPal website for Order submittal");
    } else {
      upgrdPWD(userEM, AppID);
    }
  }
}

function upgrdPWD(email, appNum) {
  var ugPwd = "";
  emAddr = email.toLowerCase();
  posAt = emAddr.indexOf("@");
  emName = emAddr.slice(0, posAt);
  emDom = emAddr.substring(posAt + 1);
  posDm = emDom.indexOf(".");
  emDomNm = emDom.slice(0, posDm);
  if (appNum == 1011) {
    appID = "G0A0";
  }

  char1 = String.fromCharCode(
    ((emDomNm.charCodeAt(0) + emDom.length) % 26) + 65
  );
  char2 = String.fromCharCode(
    ((emDomNm.charCodeAt(1) + emDom.length) % 10) + 48
  );
  char3 = String.fromCharCode(
    ((emName.charCodeAt(0) + appID.charCodeAt(0)) % 26) + 65
  );
  char4 = String.fromCharCode(
    ((emName.charCodeAt(1) + appID.charCodeAt(1)) % 10) + 48
  );
  char5 = String.fromCharCode(
    ((emName.charCodeAt(2) + appID.charCodeAt(2)) % 26) + 65
  );
  char6 = String.fromCharCode(
    ((emName.charCodeAt(3) + appID.charCodeAt(3)) % 10) + 48
  );

  console.log(char1, char2, char3, char4, char5, char6);
  return char1 + char2 + char3 + char4 + char5 + char6;
}

function connMYSQL() {
  var mysql = require("mysql");

  var con = mysql.createConnection({
    host: "chemesoftstorecom.ipagemysql.com",
    user: "ghutch",
    password: "Wyo=Hutch14",
    port: 3308
  });

  con.connect(function(err) {
    if (err) throw console.log(err);
    console.log("Connected !");
  });
}
// connMYSQL();
