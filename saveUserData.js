async function fb_saveUserData() {

    userAge = document.getElementById("age").value;
    userName = document.getElementById("name").value;

    if (GLOBAL_user && userAge >= 16) {

        console.log("saving user data")

        await firebase.database().ref("database/users/" + uid + "/email").set(GLOBAL_user.email);
        await firebase.database().ref("database/users/" + uid + "/photo").set(GLOBAL_user.photoURL);

        await firebase.database().ref("database/users/" + uid + "/name").set(userName);
        await firebase.database().ref("database/users/" + uid + "/age").set(Number(userAge));

        window.location.href = "gameSelection.html"

    } else if (userAge < 16) {
        alert("You are too young to use this site!")
    } else {
        fb_error();
    }
}