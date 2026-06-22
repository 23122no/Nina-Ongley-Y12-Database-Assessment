var userName;
var userAge;

var spaceInvadersScoresRead = false;

function fb_readScores(game) {
    if (game == "spaceInvaders") {
        spaceInvadersScoresRead = true;
    } else if (game == "geoDash") {
        spaceInvadersScoresRead = false;
        leaderboard.innerHTML = ""
    } else {
        leaderboard.innerHTML = ""
    }
    console.log("reading " + game + "high scores")
    leaderboard.innerHTML += "<h2>" + game + " High Scores </h2>"
    firebase.database().ref("database/" + game).orderByChild("score").once("value", fb_displayHighScores, fb_error)
}

async function fb_displayHighScores(scores) {
    console.log(scores.val())
    var score = scores.val()
    var uidList = Object.keys(score)
    for (i = 0; i < uidList.length; i++){
        var currentUID = uidList[i];
        var userData = await firebase.database().ref("database/users/" + currentUID).once("value")
        var currentUserData = userData.val()
        leaderboard.innerHTML += "<img src='" + currentUserData["photo"] + "' width='30px' height='30px' >"
        leaderboard.innerHTML += "<p>          " + currentUserData["name"] + " got " + score[currentUID].score + " points. </p><br><br>";
    }
    if (spaceInvadersScoresRead == false){
        fb_readScores("spaceInvaders");
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
