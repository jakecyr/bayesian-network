var fs = require("fs");
const csv = require("csvtojson");

var BayesianNetwork = require("../bayesian_network");
var classifier = new BayesianNetwork();

fs.readFile("../data/movie_ratings.csv", function(err, result){

    csv({noheader:false}).fromString(result.toString())
    .on('csv',(row)=>{ 
        if(row.length > 0) classifier.addDocument([row[0], row[1]], row[2]);
    })
    .on('done',()=>{
        classifier.calculateLogFrequencies();
        console.log(classifier.classify(['1', '31']));
    });
});