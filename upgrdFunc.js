function downLoad(appNum) {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "download.php?q=" + appNum.toString(), true);
  xhttp.send();
}

async function upgrdApp(appNum, paybool) {
  var userEM = prompt(
    "Please Enter E-mail address to receive PASSWORD for App Upgrade"
  );
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(userEM)) {
    alert("No or INVALID E-mail Address Entered");
    return false;
  } else {
    if (paybool) {
      var appID = await getAppID(appNum);
      var paidPwd = await genPwd(userEM, appID);
      console.log(appID, paidPwd);
      xhttp = new XMLHttpRequest();
      xhttp.open(
        "GET",
        "upgrddb.php?email=" +
          userEM +
          "&appnum=" +
          appNum.toString() +
          "&ugpwd=" +
          paidPwd,
        true
      );
      xhttp.send();
      alert("Connecting to PayPal website for Order submittal");
    } else {
      var freePwd = await genPwd(userEM, "G0A0");
      sendPwd(userEM, freePwd);
      alert("Sending UPGRADE password (" + freePwd + ") to '" + userEM + "'");
    }
  }
}

function getAppID(appNum) {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "appID.php?q=" + appNum.toString(), false);
  xhttp.send();
  return xhttp.responseText;
}

function genPwd(email, appID) {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "pwdGener.php?email=" + email + "&appid=" + appID, false);
  xhttp.send();
  return xhttp.responseText;
}

function sendPwd(emClient, freePwd) {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "sendEM.php?q=" + emClient + "&p=" + freePwd, true);
  xhttp.send();
}
