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


    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var tFrequency = $("#train-frequency").val().trim();

    dataRef.ref().push({
        train: trainName,
        start: firstTime,
        where: destination,
        often: tFrequency
    });

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-time").val("");
    $("#train-frequency").val("");

    animateTrain();


});

dataRef.ref().on("child_added", function (childSnapshot) {

    var startConverted = moment(childSnapshot.val().start, "HH:mm").subtract(1, "days");
    var diffTime = moment().diff(moment(startConverted), "minutes");
    var tFrequency = childSnapshot.val().often;
    var tRemainder = diffTime % tFrequency;
    var minsAway = tFrequency - tRemainder;

    console.log("diffTime: " + diffTime)
    var nextArrival = moment().add(minsAway, "minutes").format("hh:mm");

    $("#table-values").append("<tr><td>" + childSnapshot.val().train + "<td>" + childSnapshot.val().where + "<td>" + childSnapshot.val().often + "<td>" + nextArrival + "<td>" + minsAway);

});

function animateTrain() {
    console.log("animation running");
    var train = document.getElementById("train-icon");
    train.classList.remove("run-animation");
    void train.offsetWidth;
    // -> and re-adding the class
    train.classList.add("run-animation");

    $("#train-icon").animate({
        left: "+=2000",

    }, 10000, function () { $(this).removeAttr('style'); });    
    //plays train sound
    var audio = $("#mysoundclip")[0];
    audio.play();
}



