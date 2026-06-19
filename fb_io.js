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


function fb_authenticate(){
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
    if (window.location.pathname.endsWith("index.html")){
      fb_checkUserID();
    }
    if (window.location.pathname.endsWith("userRegistration")) {
      fb_getUserData();
    }

  } else  {
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


function fb_error(){
    // Don't forget your error handling!
      alert("there was an error reading the message");
     console.error(error);
}