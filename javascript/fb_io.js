/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

var GLOBAL_user;  // Google's user object
var uid;


function fb_authenticate() {
  // authenticate with Google
  console.log("fb_authenticate running")
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

// Run when the login state of the user changes.
function fb_handleLogin(_user) {
  if (_user) {
    GLOBAL_user = _user; // Save the user object to a global variable
    uid = _user.uid;
    console.log("User is logged in")
    console.log(GLOBAL_user);
    // If the user is on the login page, check whether they have logged in before
    if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")) {
      fb_checkUserID();
    }
    // If the user is on the game selection page, read their data in the database
    if (window.location.pathname.endsWith("/gameSelection.html")) {
      fb_getUserData();
    }
    fb_checkUserValidity()

  } else {
    console.log("User is NOT logged in - Starting the popup process")
    fb_popupLogin();
  }
}

// Run the Google login popup
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;  // Save the user object to a global variable
    console.log("User has logged in")
  });
}


function fb_error() {
  // Error handling
  alert("An error has occured!");
  console.error(error);
}

function fb_checkUserValidity() {
  console.log
  firebase.database().ref("database/users/" + uid).once("value", fb_handleValidityData, fb_error)
}

function fb_handleValidityData(snapshot) {
  if (snapshot.val() == null && 
  (window.location.pathname.endsWith("/") == false && window.location.pathname.endsWith("userRegistration.html") == false)) {
    console.log("not allowed to be on this page!!")
    window.location.href = "index.html"
  }
}
