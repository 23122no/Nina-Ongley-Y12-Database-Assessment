/*****************************************************/
// fb_io.js
// Written Term 2 2026
/*****************************************************/

// Declare variables
var GLOBAL_user;  // Google's user object
var uid;

function fb_authenticate() {
  // authenticate with Google
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

// Run when the login state of the user changes.
function fb_handleLogin(_user) {
  if (_user) {
    GLOBAL_user = _user; // Save the user object to a global variable
    uid = _user.uid;
    console.log("User is logged in")
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

/*****************************************************/
// fb_checkUserValidity
// Reads the current user's data
/*****************************************************/
function fb_checkUserValidity() {
  // Read the data of the current user and run rb_handleValidityData()
  firebase.database().ref("database/users/" + uid).once("value", fb_handleValidityData, fb_error)
}

/*****************************************************/
// fb_handleValidityData()
// Check if the user is registered
// If they aren't, take them to the login page
/*****************************************************/
function fb_handleValidityData(snapshot) {
  if (snapshot.val() == null && 
  (window.location.pathname.endsWith("/") == false && window.location.pathname.endsWith("userRegistration.html") == false)) {
    window.location.href = "index.html"
  }
}
