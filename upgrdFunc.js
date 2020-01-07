function downLoad(appNum) {
  console.log("Download script");
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "laramie",
    database: "chemtest",
    insecureAuth: true
  });
  console.log(new Date(), appNum);
  con.connect(function(err) {
    if (err) throw console.log(err);
    var sql = "INSERT INTO Downloads (AppNum) VALUES ('" + appNum + "')";
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    con.end();
  });
}

function upgrdApp(appNum, paybool) {
  var userEM = "ab.test@linkedin.com";
  // var userEM = prompt(
  //   "Please Enter E-mail address to receive PASSWORD for App Upgrade"
  // );
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(userEM)) {
    // alert("No or INVALID E-mail Address Entered");
    return false;
  } else {
    if (paybool) {
      var mysql = require("mysql");
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "laramie",
        database: "chemtest",
        insecureAuth: true
      });
      con.connect(function(err) {
        if (err) throw console.log(err);
        var sql = "SELECT * FROM appdata WHERE AppNum = " + appNum;
        con.query(sql, function(err, result, fields) {
          if (err) throw err;
          appID = result[0].AppID;
          paidPwd = genPwd(userEM, appID);
          console.log(appNum, appID, userEM, paidPwd);
        });
        // var sql = "INSERT INTO upgrades (upgrdDT, ugEmail, ugApp, ugPwd) VALUES ()" + appNum;
        // // var appPwd = "";
        // con.query(sql, function(err, result, fields) {
        //   if (err) throw err;
        //   appID = result[0].AppID;
        //   paidPwd = genPwd(userEM, appID);
        //   console.log(appID, paidPwd);
        // });
        con.end();
      });
      // alert("Connecting to PayPal website for Order submittal");
    } else {
      freePwd = genPwd(userEM, "G0A0");
      console.log(freePwd);
    }
  }
}

function genPwd(email, appID) {
  var ugPwd = "";
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
    }
  });
}
console.log(new Date());
