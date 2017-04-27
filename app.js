var fs = require("fs");
var BayesianNetwork = require("./bayesian_network");
var classifier = new BayesianNetwork();

var trainingData = [
    {input: "Today was a great fun beautiful day", output: "positive"},
    {input: "I love you", output: "positive"},
    {input: "You are nice", output: "positive"},
    {input: "I had a lot of fun outside today", output: "positive"},
    {input: "This is a really positive thing to say", output: "positive"},
    {input: "I had an awful day", output: "negative"},
    {input: "I do not like you", output: "negative"},
    {input: "I hate you", output: "negative"},
    {input: "You suck", output: "negative"},
    {input: "You are not a good person", output: "negative"},
    {input: "It was rainy outside today", output: "negative"}
];

classifier.train(trainingData);
classifier.calculateProbabilities();

var training = "I hate you";
console.log(classifier.classify(training));

// classifier.save("brain.js");