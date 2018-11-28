
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


    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var tFrequency = $("#train-frequency").val().trim();

    var currentTime = moment();

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");


    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: tFrequency
    }

    dataRef.ref().push(newTrain);


    // console.log("Name: " + trainName);
    // console.log("Destination: " + destination);
    // console.log("First Train: " + firstTime);
    // console.log("Frequency " + tFrequency)
    // console.log("First time:" + firstTimeConverted);
    // console.log("CURRENT TIME: " + currentTime.format("hh:mm"));
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    // console.log(tRemainder);
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // console.log("ARRIVAL TIME: " + nextTrain);

});

dataRef.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().destination);
    // // console.log(childSnapshot.val().firstTime);
    // console.log(childSnapshot.val().frequency);
    // console.log(childSnapshot.val().nextTrain);
    // console.log(childSnapshot.val().minutesAway);

    renderRow(childSnapshot);


}, function (errorObject) {
    console.log("Errors Handled: " + errorObject.code);
});

function renderRow(childSnapshot) {
    trainName = childSnapshot.val().name;
    destination = childSnapshot.val().destination 
    tFrequency = childSnapshot.val().frequency;


    diffTime = moment().diff(moment(childSnapshot.val().firstTime), "minutes");

    // Time apart (remainder)
    tRemainder = diffTime % childSnapshot.val().frequency;

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    $("#table-values").append("<tr><td>" + trainName + "<td>" + destination + "<td>" + tFrequency + "<td>" + nextTrain + "<td>" + tMinutesTillTrain);



}


