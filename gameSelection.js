var userName;
var userAge;

var spaceInvadersScoresRead = false;

function fb_readScores(game) {
    console.log("fb_readScores , game = " + game)
    if (game == "spaceInvaders") {
        spaceInvadersScoresRead = true;
    } else {
        if (game == "geoDash") {
            spaceInvadersScoresRead = false;
        }
        leaderboard.innerHTML = ""
    }
    console.log("reading " + game + "high scores")
    leaderboard.innerHTML += "<h2>" + game + " High Scores </h2>"
    firebase.database().ref("database/" + game).orderByChild("score").once("value", fb_displayHighScores, fb_error)
}

async function fb_displayHighScores(scores) {
    console.log("fb_displayHighScores")
    console.log(scores.val())
    scores.forEach(fb_displayOneScore)
}

let currentScore;

function fb_displayOneScore(scoreData) {
    console.log("running fb_displayOneScore")
    currentScore = scoreData.val()
    var currentUID = scoreData.key
    //var userData = await firebase.database().ref("database/users/" + currentUID).once("value")
    firebase.database().ref("database/users/" + currentUID).once("value", fb_readUserScoreData, fb_error)
    //var currentUserData = userData.val()
    //console.log(currentUserData)
    //leaderboard.innerHTML += "<img src='" + currentUserData["photo"] + "' width='30px' height='30px' >"
    leaderboard.innerHTML += "<p>          " + currentUID + " got " + currentScore["score"] + " points. </p><br><br>";
}

function fb_readUserScoreData(child) {
    console.log(currentScore["score"])
    console.log(child.val())
}

/****** 
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
*******/

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
