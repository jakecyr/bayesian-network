var network = require("./bayesian_network");

var net = new network.BayesianNetwork();

var trainingData = [
    {input: "Today was a great fun beautiful day", output: "positive"},
    {input: "I had a lot of fun outside today", output: "positive"},
    {input: "This is a really positive thing to say", output: "positive"},
    {input: "I had an awful day", output: "negative"},
    {input: "I do not like you", output: "negative"},
    {input: "I hate you", output: "negative"},
    {input: "It was rainy outside today", output: "negative"}
];

var training = "Today was a fun day".toUpperCase().split(" ");

net.train(trainingData);
net.calculateProbabilities();

var prediction = net.predict(training);

// console.log(net.toJSON());
console.log(prediction.classification.label);