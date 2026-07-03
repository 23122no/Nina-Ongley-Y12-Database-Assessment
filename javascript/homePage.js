/*****************************************************/
// homePage.js
// Written Term 2 2026
/*****************************************************/

/*****************************************************/
// fb_checkUserID()
// Reads the data associated with the current user's uid
/*****************************************************/
function fb_checkUserID() {
    // Read the database for the current user's data
    firebase.database().ref("database/users/" + uid).once("value", fb_checkUserPresence, fb_error)
}

/*****************************************************/
// fb_checkUserPresence()
// Checks if the user is already in the database
// Sends them to the correct page based on this result
/*****************************************************/
function fb_checkUserPresence(currentUser) {
    // If there is no data for the current user, 
    // they are new to site so take them to registration pagr
    if (currentUser.val() == null) {
        window.location.href = "userRegistration.html"
    } else {
        // Take the user to the game selection page if the are already in the database
        window.location.href = "gameSelection.html"
    }
}
