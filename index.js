function fb_checkUserID() {
    console.log("checking user id")
    console.log(uid)
    firebase.database().ref("database/users/" + uid).once("value", fb_checkUserPresence, fb_error)
}

function fb_checkUserPresence(currentUser) {
    console.log(currentUser.val())
    if (currentUser.val() == null) {
        console.log("user is new to site")
        window.location.href = "userRegistration.html"
    } else {
        console.log("user has visited site before")
        window.location.href = "gameSelection.html"
    }
}
