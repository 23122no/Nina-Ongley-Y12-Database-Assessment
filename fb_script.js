const FORM_HTML = `
    <form id="registrationForm">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" autocomplete="name" required />

        <br><br>

        <label for="age">Your Age:</label>
        <input type="number" id="age" name="age" required />
    </form>
    
    <br>

    <button type="submit" onclick="fb_saveUserData()">Submit</button>`

function fb_checkUserID() {
    console.log("checking user id")
    firebase.database().ref("database/users/" + uid).once("value", fb_checkUserPresence, fb_error)
}

function fb_checkUserPresence(currentUser) {
    if (currentUser.val() == null) {
        console.log("user is new to site")
        indexOptions.innerHTML = FORM_HTML;
    } else {
        console.log("user has visited site before")
        window.location.href = "gameSelection.html"
    }
}

function fb_saveUserData() {

    const userAge = document.getElementById("age").value;
    const userName = document.getElementById("name").value;

    if (GLOBAL_user && userAge >= 16) {

        console.log("saving user data")

        firebase.database().ref("database/users/" + uid + "/email").set(GLOBAL_user.email);
        firebase.database().ref("database/users/" + uid + "/photo").set(GLOBAL_user.photoURL);

        firebase.database().ref("database/users/" + uid + "/name").set(userName);
        firebase.database().ref("database/users/" + uid + "/age").set(Number(userAge));

        window.location.href = "gameSelection.html"

    } else if (userAge < 16) {
        alert("You are too young to use this site!")
    } else {
        fb_error();
    }
}

function fb_readHighScores() {
    console.log("reading high scores")
    firebase.database().ref("database/geoDash").once("value", fb_displayHighScores, fb_error)
}

function fb_displayHighScores(scores) {
    console.log(scores.val())
    leaderboard.innerHTML = ""
    scores.forEach(fb_displayOneScore);
}

function fb_displayOneScore(currentScore) {
    var scoreDisplaying = currentScore.val()
    console.log(scoreDisplaying)
}