  var config = {
    apiKey: "AIzaSyCDQIYGDEaMgWCbTVl4AXnAaQJkqxstI7g",
    authDomain: "train-time-56679.firebaseapp.com",
    databaseURL: "https://train-time-56679.firebaseio.com",
    projectId: "train-time-56679",
    storageBucket: "train-time-56679.appspot.com",
    messagingSenderId: "402320557808"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var AlertTimeout

database.ref().on("child_added", function(snap){
    var results = snap.val();
    var tr = $("<tr>")
    tr.append("<td>" + results.name + "</td>");
    tr.append("<td>" + results.dest + "</td>");
    tr.append("<td>" + results.frequency + "</td>");
    var startTime = moment().format("HH:mm");
    var frequency = parseInt(results.frequency);

    var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;

    var tMinutesTillTrain = frequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    tr.append("<td>" + moment(nextTrain).format("hh:mm A, ddd") + "</td>");
    tr.append("<td>" + tMinutesTillTrain + "</td>");
    $(".trains").append(tr);
    
})

$("#add-train").on("click",function(event){
    event.preventDefault();
    
    $("#alert-holder").empty();

    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-dest").val().trim();
    var trainStart = $("#train-time").val().trim();
    trainStart = trainStart.padStart(4, "0")
    var trainFreq = $("#train-freq").val().trim();

    if (trainName && trainDest && trainStart && trainFreq){
        database.ref().push({
            name : trainName,
            dest : trainDest,
            start : trainStart,
            frequency : trainFreq
        })
        $("train-name").val("");
        $("train-dest").val("");
        $("train-time").val("");
        $("train-freq").val("");
    }

    else {
        if(!trainName){
            $("#alert-holder").append("<div class='alert alert-danger' role='alert'><strong>Missing a Train Name!</strong></div>");
        }
        if(!trainDest){
            console.log("No Train Dest")
            $("#alert-holder").append("<div class='alert alert-danger' role='alert'><strong>Missing a Train Destination!</strong></div>");
        }
        if(!trainFreq){
            console.log("No Train Freq")
            $("#alert-holder").append("<div class='alert alert-danger' role='alert'><strong>Missing Train Freq!</strong></div>");
        }
    }

    
});