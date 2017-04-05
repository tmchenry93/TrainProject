// Initialize Firebase
var config = {
	apiKey: "AIzaSyDoOikDGhdrxhmBGoXtgJo1BeuHrim5jUs",
    authDomain: "train-project-d7cd9.firebaseapp.com",
    databaseURL: "https://train-project-d7cd9.firebaseio.com",
    projectId: "train-project-d7cd9",
    storageBucket: "train-project-d7cd9.appspot.com",
    messagingSenderId: "644261543599"
};
	firebase.initializeApp(config);

// Create a variable to referenct the database
var database = firebase.database();

// Submit button function
$("#button").on("click", function() {
	event.preventDefault();

  	// Setting values to the initial values
  	var name = $("#trainName").val().trim();
  	var destin = $("#destination").val().trim();
  	var first = $("#firstTime").val().trim();
  	var freq = $("#frequency").val().trim();

  	var train = {
  		name: name,
  		destin: destin,
  		first: first,
  		freq: freq
  	};
  	
  	// Sending the information to be stored in the database
  	database.ref().push(train);
  	
  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#firstTime").val("");
  	$("#frequency").val("");
});

// Allowing us to grab, store, manipulate data in the database to place it on the website
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	// Storing time and math equations to equate next arrival and minutes away
	var start = moment(childSnapshot.val().first, "hh:mm");
	var frequent = childSnapshot.val().freq;
	var now = moment();
	var diff = now.diff(start, "minutes");
	var remainder = diff%frequent;
	var minutesAway = frequent - remainder;
	var arrival = now.add(minutesAway, "minutes").format("HH:mm");

	// Appending the variables to the appropriate areas in the table
	$("#current").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destin + "</td><td>" + childSnapshot.val().freq + "</td><td>" + arrival + "</td><td>" + minutesAway + "</td></tr>");
});


