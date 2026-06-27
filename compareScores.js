var currentGame;

async function fb_compareScores(game, recentScore) {
    currentGame = game;
    var pastScoreData = await firebase.database().ref("database/"+ game + "/" + uid).once("value")
    var pastScore = pastScoreData.val()
    if (pastScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/" + game + "/" + uid + "/score").set(recentScore * -1);
    } else {
        console.log(recentScore)
        console.log(-pastScore["score"])
        if (recentScore > -pastScore["score"]) {
            firebase.database().ref("database/" + game + "/" + uid + "/score").set(recentScore * -1);
        }
    }
}
