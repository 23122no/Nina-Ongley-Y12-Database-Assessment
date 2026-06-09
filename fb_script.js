function fb_checkUserID() {
    firebase.database().ref("database/users/" + uid).once("value", fb_checkUserPresence, fb_error)
}

function fb_checkUserPresence(currentUser) {
    if (currentUser.val() == null) {
        window.location.href = "userRegistration.html"
    } else {
        window.location.href = "gameSelection.html"
    }
}

function fb_saveUserData() {

    if (GLOBAL_user) {

        //const userName = document.getElementById("name").value;
        //const userAge = document.getElementById("age").value;

        firebase.database().ref("database/users/" + uid + "/email").set(GLOBAL_user.email);
        firebase.database().ref("database/users/" + uid + "/photo").set(GLOBAL_user.photoURL);
        //firebase.database().ref("database/users/" + uid + "/name").set(userName);
        //firebase.database().ref("database/users/" + uid + "/age").set(userAge);

    } else {
        fb_error();
    }
}