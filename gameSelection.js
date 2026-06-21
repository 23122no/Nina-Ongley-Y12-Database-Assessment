var userName;
var userAge;

var geoDashScoresRead = false;
var spaceInvadersScoresRead = false;

function fb_readGeoDashScores() {
    console.log("reading geo dash high scores")
    spaceInvadersScoresRead = false;
    leaderboard.innerHTML = "<h2> GeoDash High Scores </h2>"
    firebase.database().ref("database/geoDash").orderByChild("score").once("value", fb_displayHighScores, fb_error)
}

function fb_readSpaceInvadersScores() {
    console.log("reading space invaders high scores")
    spaceInvadersScoresRead = true;
    leaderboard.innerHTML += "<h2> Space Invaders High Scores </h2>" 
    firebase.database().ref("database/spaceInvaders").orderByChild("score").once("value", fb_displayHighScores, fb_error)
}

async function fb_displayHighScores(scores) {
    console.log(scores.val())
    var score = scores.val()
    var uidList = Object.keys(score)
    for (i = 0; i < uidList.length; i++){
        var currentUID = uidList[i];
        var userData = await firebase.database().ref("database/users/" + currentUID).once("value")
        var currentUserData = userData.val()
        leaderboard.innerHTML += "<img src='" + currentUserData["photo"] + "' width='50px' height='50px' >"
        leaderboard.innerHTML += "<p>          " + currentUserData["name"] + " got " + score[currentUID].score + " points. </p><br><br>";
    }
    if (spaceInvadersScoresRead == false){
        fb_readSpaceInvadersScores();
    }
}

async function fb_getUserData() {
    console.log(uid)
    var snapshot = await firebase.database().ref("database/users/" + uid).once("value")
    var user = snapshot.val()
    console.log(user)
    userName = user["name"]
    userAge = user["age"]
    console.log(userName)
    fb_displayUserWelcome();
}

function fb_displayUserWelcome() {
    welcome.innerHTML = "<h1> Welcome, " + userName + "! Here are some games:</h1>"
}
