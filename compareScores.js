var currentGame;

async function fb_compareScores(game) {
    currentGame = game;
    var userScoreData = await firebase.database().ref("database/"+ game + "/" + uid).once("value")
    var userScore = userScoreData.val()
    if (userScore == null) {
        console.log("no score recorded, adding this score")
        firebase.database().ref("database/users/" + uid).once('value', fb_readUserData, fb_error);
    } else {
        console.log(score)
        console.log(-userScore["score"])
        if (score > -userScore["score"]) {
            firebase.database().ref("database/" + game + "/" + uid + "/score").set(score * -1);
        }
    }
}