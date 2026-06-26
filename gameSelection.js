var userName;
var userAge;

var spaceInvadersScoresRead = false;

var currentGame;

var currentLeaderboard;

var usersSnapshot;
async function fb_readScores(game) {
    currentGame = game;
    currentLeaderboard = document.getElementById(currentGame)
    console.log("fb_readScores , game = " + game)
    if (game == "spaceInvaders") {
        spaceInvadersScoresRead = true;
        currentLeaderboard.innerHTML = "<h2>Space Invaders High Scores</h2>"
    } else {
        if (game == "geoDash") {
            spaceInvadersScoresRead = false;
            currentLeaderboard.innerHTML = "<h2>Geo Dash High Scores</h2>"
            spaceInvaders.innerHTML = ""
        }
    }
    const scoresSnapshot = await firebase.database().ref("database/" + game).orderByChild("score").limitToFirst(3).once("value")
    usersSnapshot = await firebase.database().ref("database/users").once("value")
    scoresSnapshot.forEach(displayOneScore)
    console.log("reading " + game + "high scores")
}

function fb_displayOneScore(scoreData) {
    console.log("running fb_displayOneScore")
    var uid = scoreData.key;
    var userName = usersSnapshot.child(uid).val().name
    var profilePhoto = usersSnapshot.child(uid).val().photo
    console.log(uid + userName + profilePhoto)
    currentLeaderboard.innerHTML += "<p>          " + userName + " got " + scoreData.val().score * -1 + " points. </p><br><br>"; 
    //currentScore = scoreData.val()
    //var currentUID = scoreData.key
    //console.log(currentGame)
    //currentLeaderboard.innerHTML += "<img src='" + currentScore["photo"] + "' width='30px' height='30px' >"
    //currentLeaderboard.innerHTML += "<p>          " + currentScore["name"] + " got " + currentScore["score"] * -1 + " points. </p><br><br>";
}


/*****
function fb_readScores(game) {
    currentGame = game;
    currentLeaderboard = document.getElementById(currentGame)
    console.log("fb_readScores , game = " + game)
    if (game == "spaceInvaders") {
        spaceInvadersScoresRead = true;
        currentLeaderboard.innerHTML = "<h2>Space Invaders High Scores</h2>"
    } else {
        if (game == "geoDash") {
            spaceInvadersScoresRead = false;
            currentLeaderboard.innerHTML = "<h2>Geo Dash High Scores</h2>"
            spaceInvaders.innerHTML = ""
        }
    }
    console.log("reading " + game + "high scores")
    firebase.database().ref("database/" + game).orderByChild("score").limitToFirst(3).once("value", fb_displayHighScores, fb_error)
}

async function fb_displayHighScores(scores) {
    console.log("fb_displayHighScores")
    console.log(scores.val())
    await scores.forEach(fb_displayOneScore)
    if (spaceInvadersScoresRead == false) {
        fb_readScores("spaceInvaders")
    }
}

let currentScore;

function fb_displayOneScore(scoreData) {
    console.log("running fb_displayOneScore")
    currentScore = scoreData.val()
    var currentUID = scoreData.key
    console.log(currentGame)
    currentLeaderboard.innerHTML += "<img src='" + currentScore["photo"] + "' width='30px' height='30px' >"
    currentLeaderboard.innerHTML += "<p>          " + currentScore["name"] + " got " + currentScore["score"] * -1 + " points. </p><br><br>";
}

***/

/**
async function fb_displayHighScores(scores) {
    console.log(scores.val())
    var score = scores.val()
    var uidList = Object.keys(score)
    for (i = 0; i < uidList.length; i++){
        var currentUID = uidList[i];
        var userData = await firebase.database().ref("database/users/" + currentUID).once("value")
        var oldScoreData = await firebase.database().ref("database/" + currentGame + "/" + currentUID + "/score").once("value")
        var oldScore = oldScoreData.val()
        console.log(oldScore)
        await firebase.database().ref("database/" + currentGame + "/" + currentUID + "/score").set(oldScore * -1)
        var currentUserData = userData.val()
        //leaderboard.innerHTML += "<img src='" + currentUserData["photo"] + "' width='30px' height='30px' >"
        //leaderboard.innerHTML += "<p>          " + currentUserData["name"] + " got " + score[currentUID].score + " points. </p><br><br>";
    }
    if (spaceInvadersScoresRead == false){
        fb_readScores("spaceInvaders");
    }
}

***/



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