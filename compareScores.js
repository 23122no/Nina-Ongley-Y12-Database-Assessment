function fb_readPastSpaceInvadersScore() {
    console.log(uid)
    firebase.database().ref("database/spaceInvaders/" + uid).once("value", fb_compareSpaceInvadersScores, fb_error)
}

function fb_compareSpaceInvadersScores(userScoreData) {
    var pastScore = userScoreData.val()
    if (pastScore["score"] < score || pastScore["score"] == null){
        firebase.database().ref("database/spaceInvaders/" + uid + "/score").set(score);
    }
}

function fb_readPastGeoDashScore() {
    console.log(uid)
    firebase.database().ref("database/geoDash/" + uid).once("value", fb_compareGeoDashScores, fb_error)
}

function fb_compareGeoDashScores(userScoreData) {
    var pastScore = userScoreData.val()
    if (pastScore["score"] < score || pastScore["score"] == null){
        firebase.database().ref("database/geoDash/" + uid + "/score").set(score);
    }
}