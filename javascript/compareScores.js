async function fb_compareScores(game, recentScore) {
    // Read the database for the user's stored score in the game they played
    var pastScoreData = await firebase.database().ref("database/"+ game + "/" + uid).once("value")
    var pastScore = pastScoreData.val()
    // If the user has no saved score, then store the score they just got
    if (pastScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/" + game + "/" + uid + "/score").set(-recentScore);
    } else {
        console.log(recentScore)
        console.log(-pastScore["score"])
        // If the user's score they just got is bigger than the old score, then replace the old score
        if (recentScore > -pastScore["score"]) {
            alert("You got your high score! Your old score was "+-pastScore["score"]+" and your new score is "+recentScore+"!")
            firebase.database().ref("database/" + game + "/" + uid + "/score").set(-recentScore);
        }
    }
}
