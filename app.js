var network = require("./bayesian_network");

var net = new network.BayesianNetwork();

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

var training = "You are not my favorite".toUpperCase().split(" ");

net.train(trainingData);
net.calculateProbabilities();

var prediction = net.predict(training);

//Logs an object with P values for all labels and the max P value including the corresponding label
console.log(prediction);