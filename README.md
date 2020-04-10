# Bayesian Network

A simple Bayesian network based on Baye's rule and the conditional independence assumption.

## Example Usage

```javascript
const classifier = new BayesianNetwork();

classifier.addDocument("hello you are amazing", "positive");
classifier.addDocument("today is a beautiful day", "positive");
classifier.addDocument("its dark out today", "negative");
classifier.addDocument("today was bad", "negative");

classifier.calculateLogFrequencies();

console.log(classifier.classify('hello you are great'));

/*
{
  classification: { label: 'POSITIVE', value: -6.238324625039508 },
  labels: { POSITIVE: -6.238324625039508, NEGATIVE: -6.238324625039508 }
}
*/
```
