const csv = require("csvtojson");
const BayesianNetwork = require("../main");

const classifier = new BayesianNetwork();

// Predict if a tweet is about a natural disaster or not
csv()
    .fromFile('../data/natural_disaster.csv')
    .then((data) => {
        data.forEach((row) => classifier.addDocument(row.tweet, row.label));

        classifier.calculateLogFrequencies();

        console.log(classifier.classify("Thoughts and prayers go out to those who were involved in the fertilizer plant explosion in West, TX."));
        console.log(classifier.classify("Happy to see everyone in Calgary pulling together as community and staying safe through this disaster. #albertaflooding"));
        console.log(classifier.classify("@wjjenn haha, oh right! You did mention that before. Gel capsules will work just as well as liquid form."));
        console.log(classifier.classify("Anyone inspired to commit violence after playing Mass Effect 3 is even more unwell than if he played a different game"));
    });
