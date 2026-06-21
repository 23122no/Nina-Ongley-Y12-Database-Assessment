function fb_readPastSpaceInvadersScore() {
    firebase.database().ref("database/spaceInvaders/" + uid).once("value", fb_compareSpaceInvadersScores, fb_error)
}

function fb_compareSpaceInvadersScores(userScoreData) {
    var userScore = userScoreData.val()
    if (userScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/spaceInvaders/" + uid + "/score").set(score);
    } else {
        if (score > userScore["score"]) {
            firebase.database().ref("database/spaceInvaders/" + uid + "/score").set(score);
        }
    }
}

function fb_readPastGeoDashScore() {
    firebase.database().ref("database/geoDash/" + uid).once("value", fb_compareGeoDashScores, fb_error)
}

function fb_compareGeoDashScores(userScoreData) {
    var userScore = userScoreData.val()
    if (userScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/geoDash/" + uid + "/score").set(score);
    } else {
        if (score > userScore["score"]) {
            firebase.database().ref("database/geoDash/" + uid + "/score").set(score);
        }
    }
}
