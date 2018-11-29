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
var clickCounter = 0

$("#submit-button").on("click", function (event) {
    event.preventDefault();
    clickCounter++;
    console.log("clickCounter");

    var trainName = $("#train-name").val().trim();
    var destination = "france"
    var firstTime = $("#first-time").val().trim();
    var tFrequency = $("#train-frequency").val().trim();

    dataRef.ref().push({
        clicks: clickCounter,
        train: trainName,
        start:  firstTime,
        where: destination,
        often: tFrequency
    });

    

});

dataRef.ref().on("child_added", function (childSnapshot) {
    console.log("clicks: " + childSnapshot.val().clicks)
    console.log("train: " + childSnapshot.val().train)
    console.log("start: " + childSnapshot.val().start)
    console.log("where: " + childSnapshot.val().where)
    console.log("often: " + childSnapshot.val().often)

    var startConverted = moment(childSnapshot.val().start, "HH:mm").subtract(1, "days");


    var diffTime = moment().diff(moment(startConverted), "minutes");
    var tFrequency = childSnapshot.val().often;
    var tRemainder = diffTime % tFrequency;
    var minsAway = tFrequency - tRemainder;


    console.log("diffTime: " + diffTime)


    var nextArrival = moment().add(minsAway, "minutes").format("hh:mm");


    $("#table-values").append("<tr><td>" + childSnapshot.val().train + "<td>" + childSnapshot.val().where + "<td>" + childSnapshot.val().often + "<td>" + nextArrival + "<td>" + minsAway);

});


