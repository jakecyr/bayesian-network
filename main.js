const fs = require('fs');

class BayesianNetwork {

    data;
    saveLocation;

    constructor(pathToSaveLoadFrom) {
        this.data = {};

        if (pathToSaveLoadFrom) {
            this.saveLocation = pathToSaveLoadFrom;
            this.load(pathToSaveLoadFrom);
        }
    }
    save(fileName) {
        const data = JSON.stringify(this.data);

        if (this.saveLocation) {
            fs.writeFileSync(this.saveLocation, data);
        } else {
            fs.writeFileSync(fileName, data);
        }
    }
    load(fileName) {
        if (fs.existsSync(fileName)) {
            var buf = fs.readFileSync(fileName);
            this.data = JSON.parse(buf);
        } else {
            console.error(`File '${fileName}' doesn't exist`);
        }
    }
    addDocuments(trainingObjArray) {
        for (let i = 0; i < trainingObjArray.length; i++) {
            this.addDocument(trainingObjArray[i].input.toUpperCase().split(" "), trainingObjArray[i].output.toUpperCase());
        }
    }
    addDocument(list, val) {
        // console.log(list, val);
        if (typeof list == "string") {
            return this.addDocument(
                list
                    .toUpperCase()
                    .split(' ')
                    .filter((c) => (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
                , val);
        } else {
            val = val.toUpperCase();

            for (let i = 0; i < list.length; i++) {
                let word = list[i];

                if (this.data[val]) {
                    this.data[val].list[word] = (this.data[val].list[word] === undefined ? 1 : (parseInt(this.data[val].list[word]) || 0) + 1);
                } else {
                    this.data[val] = { "list": {}, "count": 0 };
                    this.data[val]["list"][word] = 1;
                }
            }

            this.data[val].count = (this.data[val].count || 0) + 1;
        }
    }
    calculateLogFrequencies() {
        for (const key in this.data) {
            const currentLabel = this.data[key];
            const currentList = currentLabel.list;
            const totalLabelCount = currentLabel.count;

            for (const label in currentList) {
                currentList[label] = {
                    count: currentList[label],
                    logFrequency: Math.log(currentList[label]),
                    notLogFrequency: totalLabelCount > currentList[label] ? Math.log(totalLabelCount - currentList[label]) : 0
                };
            }
        }
    }
    getAllFeatureValues() {
        const featuresObj = {};

        for (const label in this.data) {
            const listOfFeatures = this.data[label].list;

            for (const feature in listOfFeatures) {
                featuresObj[feature] = 1;
            }
        }

        return featuresObj;
    }
    getAllLabels() {
        var labelObj = {};

        for (var label in this.data) {
            labelObj[label] = 0;
        }

        return labelObj;
    }
    getLabelTotalCount() {
        var total = 0;
        for (var label in this.data) total += this.data[label].count;
        return total;
    }
    arrayToObj(array) {
        var obj = {};
        for (var i = 0; i < array.length; i++) obj[array[i]] = 1;
        return obj;
    }
    classify(input) {
        if (typeof input == "string") {
            return this.classify(
                input
                    .toUpperCase()
                    .split(' ')
                    .filter((c) => (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
            );
        }

        const featureValues = this.getAllFeatureValues();
        const labels = this.getAllLabels();

        const inputObj = this.arrayToObj(input);

        let maxValue = -Infinity;
        let maxLabel = "";

        //Loop through each known label
        for (const label in labels) {
            let logTotal = Math.log(this.data[label].count);
            let total = 0;

            //Loop through each known feature value
            for (const featureValue in featureValues) {
                //If the input contains the current feature value
                if (inputObj[featureValue]) {
                    //Get the logFrequency and count for the current feature value
                    const featureObj = this.data[label].list[featureValue];

                    if (featureObj) {
                        total += featureObj.logFrequency - logTotal;
                    } else {
                        total -= logTotal;
                    }
                } else {
                    const featureObj = this.data[label].list[featureValue];

                    if (featureObj) {
                        total += featureObj.notLogFrequency - logTotal;
                    }
                }
            }

            //Save the logFrequency value calculated for the label
            labels[label] = total;

            //Check if this label has the highest P so far
            if (total > maxValue) {
                maxValue = total;
                maxLabel = label;
            }
        }

        //Return the prediction label and P value
        return {
            classification: {
                label: maxLabel,
                value: maxValue,
            },
            labels,
        };
    }
    toJSON() {
        return JSON.stringify(this.data);
    }
    fromJSON(jsonData) {
        this.data = JSON.parse(jsonData);
    }
}

module.exports = BayesianNetwork;
