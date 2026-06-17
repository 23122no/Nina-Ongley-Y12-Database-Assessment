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
    if (currentUser.val() == null && window.location.pathname.endsWith("index.html")) {
        console.log("user is new to site")
        window.location.href = "userRegistration.html"
    } else {
        console.log("user has visited site before")
        window.location.href = "gameSelection.html"
    }
}

var userName;
var userAge;

function fb_getUserData() {
    firebase.database().ref("database/users/" + uid).once("value", fb_readUserData, fb_error)
}

function fb_readUserData(snapshot) {
    var user = snapshot.val()
    userName = user["name"]
    userAge = user["age"]
}

function fb_displayUserWelcome() {
    welcome.innerHTML = "<h1> Welcome, " + userName + "! Here are some games:</h1>"
}

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

var geoDashScoresRead = false;
var spaceInvadersScoresRead = false;

fb_readGeoDashScores();
fb_readSpaceInvadersScores();

function fb_readGeoDashScores() {
    console.log("reading high scores")
    leaderboard.innerHTML = "<h2> GeoDash High Scores </h2>"
    firebase.database().ref("database/geoDash").orderByChild("score").once("value", fb_displayHighScores, fb_error)
}

function fb_readSpaceInvadersScores() {
    console.log("reading high scores")
    leaderboard.innerHTML += "<h2> Space Invaders High Scores </h2>" 
    firebase.database().ref("database/spaceInvaders").once("value", fb_displayHighScores, fb_error)
}

async function fb_displayHighScores(scores) {
    var score = scores.val()
    var uidList = Object.keys(score)
    for (i = 0; i < uidList.length; i++){
        var currentUID = uidList[i];
        var userData = await firebase.database().ref("database/users/" + currentUID).once("value")
        var currentUserData = userData.val()
        leaderboard.innerHTML += "<p>" + currentUserData["name"] + " got " + score[currentUID].score + " points. </p>";
    }
}