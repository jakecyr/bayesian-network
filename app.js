var fs = require("fs");
var BayesianNetwork = require("./bayesian_network");
var classifier = new BayesianNetwork("brain.json");

// var trainingData = [
//     {input: "Today was a great fun beautiful day", output: "positive"},
//     {input: "I love you", output: "positive"},
//     {input: "You are nice", output: "positive"},
//     {input: "I had a lot of fun outside today", output: "positive"},
//     {input: "This is a really positive thing to say", output: "positive"},
//     {input: "I had an awful day", output: "negative"},
//     {input: "I do not like you", output: "negative"},
//     {input: "I hate you", output: "negative"},
//     {input: "You suck", output: "negative"},
//     {input: "You are not a good person", output: "negative"},
//     {input: "It was rainy outside today", output: "negative"}
// ];

// classifier.addDocuments(trainingData);

// classifier.calculateProbabilities();
// console.log(classifier.classify("You are a nice person"))

fs.readFile("./data/ratings.csv", function(err, result){
    var rows = result.toString().split("\n");

    for(var i = 1; i < rows.length; i++){
        var values = rows[i].split(",");
        classifier.addDocument([values[0], values[1]], values[2]);
    }

    classifier.calculateProbabilities();
    console.log(classifier.classify([1,3671])); // 3

    // classifier.save("brain.json");
})