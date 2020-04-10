const fs = require("fs");
const BayesianNetwork = require("../main");

fs.readFile("../data/movie_ratings.csv", (err, result) => {
    const classifier = new BayesianNetwork();

    result
        .toString()
        .split('\n')
        .slice(1)
        .map((row) => {
            const [userId, movieId, rating] = row.split(',');
            classifier.addDocument([userId, movieId], rating);
        });

    classifier.calculateLogFrequencies();

    console.log(classifier.classify(['1', '31']));
});
