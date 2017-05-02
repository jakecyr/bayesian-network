var fs = require("fs");
const csv = require("csvtojson");

var BayesianNetwork = require("./bayesian_network");
var classifier = new BayesianNetwork();

// Predict if a tweet is about a natural disaster or not
fs.readFile("./data/natural_disaster.csv", function(err, result){

    csv({noheader:false}).fromString(result.toString())
    .on('csv',(row)=>{ 
        if(row.length > 0) classifier.addDocument(row[1], row[2]);
    })
    .on('done',()=>{
        classifier.calculateLogFrequencies();
        console.log(classifier.classify("Thoughts and prayers go out to those who were involved in the fertilizer plant explosion in West, TX.").classification.label);
        console.log(classifier.classify("Happy to see everyone in Calgary pulling together as community and staying safe through this disaster. #albertaflooding").classification.label);
        console.log(classifier.classify("@wjjenn haha, oh right! You did mention that before. Gel capsules will work just as well as liquid form.").classification.label);
        console.log(classifier.classify("Anyone inspired to commit violence after playing Mass Effect 3 is even more unwell than if he played a different game").classification.label);
    });
});