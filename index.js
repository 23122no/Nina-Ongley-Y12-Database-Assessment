/*****************************************************/
// fb_checkUserID()
/*****************************************************/
function fb_checkUserID() {
    console.log("checking user id")
    console.log(uid)
    // Read the database for the current user's data
    firebase.database().ref("database/users/" + uid).once("value", fb_checkUserPresence, fb_error)
}

function fb_checkUserPresence(currentUser) {
    console.log(currentUser.val())
    // If there is no data for the current user, 
    // they are new to site so take them to registration pagr
    if (currentUser.val() == null) {
        console.log("user is new to site")
        window.location.href = "userRegistration.html"
    } else {
        // Take the user to the game selection page if the are already in the database
        console.log("user has visited site before")
        window.location.href = "gameSelection.html"
    }
}
