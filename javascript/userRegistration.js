async function fb_saveUserData() {

    userAge = document.getElementById("age").value;
    userName = document.getElementById("name").value;

    if (userName != "" && userAge != "") {

        if (GLOBAL_user && userAge >= 16) {

            console.log("saving user data")

            await firebase.database().ref("database/users/" + uid).set({
                "name": userName,
                "age": Number(userAge),
                "photo": GLOBAL_user.photoURL,
                "email": GLOBAL_user.email
            });

            window.location.href = "gameSelection.html"

        } else if (userAge < 16) {
            alert("You are too young to use this site!")
        } else {
            fb_error();
        }
    }
}