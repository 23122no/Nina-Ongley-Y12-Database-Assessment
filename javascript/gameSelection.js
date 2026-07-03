/*****************************************************/
// gameSelection.js
// Written Term 2 2026
/*****************************************************/

// Declare global variables

var currentLeaderboard;
var spaceInvadersScoresRead = false;
var usersSnapshot;

var userName;
var userAge;
var userPhoto;

/*****************************************************/
// fb_readScores()
// Reads the score data and user data from the database
/*****************************************************/
async function fb_readScores(game) {
    currentLeaderboard = document.getElementById(game)
    // If the Space Invaders scores are being read, update them being read to true and display a heading
    if (game == "spaceInvaders") {
        spaceInvadersScoresRead = true;
        currentLeaderboard.innerHTML = "<h2>Space Invaders High Scores</h2>"
    } else {
        // If the Geo Dash scores are being read, display a heading
        if (game == "geoDash") {
            currentLeaderboard.innerHTML = "<h2>Geo Dash High Scores</h2>"
        }
    }
    // Read the database for the three highest scores
    const scoresSnapshot = await firebase.database().ref("database/" + game).orderByChild("score").limitToFirst(3).once("value")
    // Read the database for all of the user data
    usersSnapshot = await firebase.database().ref("database/users").once("value")
    // For each of the top three scores, display one score
    await scoresSnapshot.forEach(fb_displayOneScore)
    // If the Space Invaders scores have not been read (ie the Geo Dash scores have been but Space Invaders haven't)
    // read the Space Invaders scores
    if (spaceInvadersScoresRead == false) {
        fb_readScores("spaceInvaders")
    }

}

/*****************************************************/
// fb_displayOneScore()
// Updates html to display each score with user's name,
// profile photo, and score 
/*****************************************************/
function fb_displayOneScore(scoreData) {
    // Store the uid of the current score's key
    var uid = scoreData.key;
    // Read the object containing all user data for the data of the current score's uid
    var userName = usersSnapshot.child(uid).val().name
    var profilePhoto = usersSnapshot.child(uid).val().photo
    // Display the user's profile photo, name, and score in the leaderboard
    currentLeaderboard.innerHTML += "<img src='" + profilePhoto + "' width='30px' height='30px' >"
    currentLeaderboard.innerHTML += "<p>          " + userName + " got " + scoreData.val().score * -1 + " points. </p><br><br>";
}

/*****************************************************/
// fb_getUserData()
// Read the data of the current user
/*****************************************************/
async function fb_getUserData() {
    // Read the user's stored data
    var userData = await firebase.database().ref("database/users/" + uid).once("value")
    var user = userData.val()
    // Update the variables to contain the user's stored data
    userName = user["name"]
    userAge = user["age"]
    userPhoto = user["photo"]
    fb_displayUserWelcome();
}

/*****************************************************/
// fb_displayUserWelcome()
// Uppdate the html to welcome the user with name and
// profile photo
/*****************************************************/
function fb_displayUserWelcome() {
    // Update the html to welcome the user with their profile photo and name
    welcome.innerHTML = "<h1> Welcome, " + userName + "! Here are some games you can play:</h1>"
    profilePhoto.innerHTML = "<img src='" + userPhoto + "'>"
}