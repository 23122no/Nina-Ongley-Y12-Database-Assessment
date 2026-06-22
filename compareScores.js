async function fb_compareScores(game) {
    var userScoreData = await firebase.database().ref("database/"+ game + "/" + uid).once("value")
    var userScore = userScoreData.val()
    if (userScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/" + game + "/" + uid + "/score").set(score);
    } else {
        if (score > userScore["score"]) {
            firebase.database().ref("database/" + game + "/" + uid + "/score").set(score);
        }
    }
}
