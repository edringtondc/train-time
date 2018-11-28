
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYlUmIiULZ0ygPkOQRD63xABpFdx3ERoU",
    authDomain: "train-time-6fcb7.firebaseapp.com",
    databaseURL: "https://train-time-6fcb7.firebaseio.com",
    projectId: "train-time-6fcb7",
    storageBucket: "",
    messagingSenderId: "210546060606"
};
firebase.initializeApp(config);


var dataRef = firebase.database();


$("#submit-button").on("click", function (event) {
    event.preventDefault();

    console.log("clicked")

//     var trainName = "";
// var destination = ""


// // Time is 3:00 AM
// var firstTime = "";

var trainName = $("#train-name").val().trim();
var destination = $("#train-destination").val().trim();
var firstTime = $("#first-time").val().trim();
var tFrequency = $("#train-frequency").val().trim();
// Current Time
var currentTime = moment();

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");



// Difference between the times

    //Data from the input updates the variables
 
    dataRef.ref().push({
        name: trainName,
        destination: destination,
        frequency: tFrequency,
        nextTrain: nextTrain,  // broken
        minutesAway: tMinutesTillTrain,
      
    });




    console.log("Name: " + trainName);
    console.log("Destination: " + destination);
    console.log("First Train: " + firstTime);
    console.log("Frequency " + tFrequency)
    console.log("First time:" + firstTimeConverted);
    console.log("CURRENT TIME: " + currentTime.format("hh:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log(tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + nextTrain);

});

dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextTrain);
    console.log(childSnapshot.val().minutesAway);

    $("#table-values").append("<tr><td>" + childSnapshot.val().name + "<td>" + childSnapshot.val().destination + "<td>" + childSnapshot.val().frequency + "<td>" + childSnapshot.val().nextTrain + "<td>" + childSnapshot.val().minutesAway);

}, function (errorObject) {
    console.log("Errors Handled: " + errorObject.code);
});


