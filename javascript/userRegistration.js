/*****************************************************/
// userRegistration.js
// Written Term 2 2026
/*****************************************************/

/*****************************************************/
// fb_saveUserData()
// Saves user data from the registration form to the database
/*****************************************************/
async function fb_saveUserData() {

    // Store the form data in variables
    userAge = document.getElementById("age").value;
    userName = document.getElementById("name").value;


    // Check if the form data is blank
    if (userName != "" && userAge != "") {

        // Check if the user is at least 16 years old
        if (GLOBAL_user && userAge >= 16) {

            // Write form data to the database
            await firebase.database().ref("database/users/" + uid).set({
                "name": userName,
                "age": Number(userAge),
                "photo": GLOBAL_user.photoURL,
                "email": GLOBAL_user.email
            });

            // Take the user to the game selection process, registration is complete
            window.location.href = "gameSelection.html"

        } else if (userAge < 16) { // Check if the user's age is less than 16
            if (userAge < 0) {
                // If age is less than 0, ask for a valid age input
                alert("Please enter a valid age!")
            } else {
                // Let them know they are too young to use this site
                alert("You are too young to use this site!")
            }
        } else {
            fb_error();
        }
    } else {
        // Ask the user to not leave fields blank
        alert("Please don't leave any fields blank!")
    }
}