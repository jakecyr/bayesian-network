module.exports.BayesianNetwork = function(){
    this.counts = {};

    this.train = function(trainingObjArray){
        for(var i = 0; i < trainingObjArray.length; i++){
            this.addElement(trainingObjArray[i].input.toUpperCase().split(" "), trainingObjArray[i].output.toUpperCase());
        }
    };

    this.addElement = function(list, val){
        for(var i = 0; i < list.length; i++){
            if(this.counts[val]){
                this.counts[val].list[list[i]] = (this.counts[val].list[list[i]] === undefined ? 0 : this.counts[val].list[list[i]]) + 1;
            }
            else{
                this.counts[val] = {"list": {}, "count": 0};
                this.counts[val]["list"][list[i]] = 1;
            }
        }
        this.counts[val].count = (this.counts[val].count || 0) + 1;
    };

    this.calculateProbabilities = function(){
        for(var key in this.counts){
            var currentLabel = this.counts[key];
            var currentList = currentLabel.list;
            var totalLabelCount  = currentLabel.count;

            for(label in currentList){
                currentList[label] = {
                    count: currentList[label],
                    probability: currentList[label] / totalLabelCount
                };
            }
        }

        // console.log(JSON.stringify(this.counts));
    };

    this.getAllFeatureValues = function(){
        var featuresObj = {};

        for(var label in this.counts){
            var listOfFeatures = this.counts[label].list;

            for(var feature in listOfFeatures){
                featuresObj[feature] = 1;
            }
        }

        return featuresObj;
    };

    this.getAllLabels = function(){
        var labelObj = {};
        for(var label in this.counts) labelObj[label] = 0;
        return labelObj;
    };

    this.getLabelTotalCount = function(){
        var total = 0;
        for(var label in this.counts) total += this.counts[label].count;
        return total;
    };

    this.arrayToObj = function(array){
        var obj = {};
        for(var i = 0; i < array.length; i++) obj[array[i]] = 1;
            return obj;
    };

    this.predict = function(input){
        var featureValues = this.getAllFeatureValues();
        var labels = this.getAllLabels();

        var totalLabelCount = this.getLabelTotalCount();

        var inputObj = this.arrayToObj(input);

        var maxValue = -100;
        var maxLabel = "";

        //Loop through each known label
        for(var label in labels){
            var list = this.counts[label].list; //Get the list of feature values for the label
            var total = Math.log10(this.counts[label].count / totalLabelCount);

            //Loop through each known feature value
            for(var featureValue in featureValues){
                //If the input contains the current feature value
                if(inputObj[featureValue]){
                    //Get the probability and count for the current feature value
                    var featureObj = this.counts[label].list[featureValue];
                    if(featureObj){
                        total = Math.max(total, Math.log10(featureObj.probability));
                    }
                }
                else{
                    var featureObj = this.counts[label].list[featureValue];
                    if(featureObj) {
                        total = Math.max(total, Math.log10(1 - featureObj.probability));
                    }
                }
            }

            //Save the probability value calculated for the label
            labels[label] = 1 - Math.abs(total);

            //Check if this label has the highest P so far
            if(total > maxValue){
                maxValue = total;
                maxLabel = label;
            }
        }

        //Return the prediction label and P value
        return {
            classification: {
                label: maxLabel,
                value: 1 - Math.abs(maxValue)
            },
            labels: labels
        };
    };

    this.toJSON = function(){
        return JSON.stringify(this.counts);
    };
}