import express from 'express';
import * as fs from 'fs';
import { readFile} from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SentimentAnalyzer } from 'node-nlp';
import ner from 'wink-ner';
import winkTokenizer from 'wink-tokenizer';
import { SpellCheck } from '@nlpjs/similarity';//replaces incorrect words
import { NGrams } from '@nlpjs/utils';//get library
import spellingDetection from 'spell-checker-js';//detect incorrect
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from '@vitalets/google-translate-api';
const {translate} = pkg;
import pkg1 from 'yargs';
const {argv} = pkg1;
import pkg2 from 'request';
const {request} = pkg2;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT=8080; 

//stuff for spellcheck
spellingDetection.load('en');//load english dictionary

app.use(express.static(__dirname + '/index'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true})); 
 app.use(cors());



readFile('./public/index.html', function (err, html) {

    if (err) throw err; 

    app.get('/', (request, response) => {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html); 
        response.end();  
      }).listen(PORT);

});

//Route that handles message logic
app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));      
app.use(bodyParser.text());
app.post('/message', function(req, res) {

  var clientInput = JSON.stringify(req.body);//Unclean JSON Input from CLient
  console.log("Server recieved: " + clientInput);

  var NLPClientInput = clientInput.substring(clientInput.indexOf(':')+2,clientInput.lastIndexOf('"')); //NLP it

  //spell check
  NLPClientInput=spelling(NLPClientInput);

  sentimentAnalysis(NLPClientInput);
  translater(NLPClientInput);
  wikipedia(NLPClientInput);
  // nameEntityRecognition() //

  res.send({ cleanedInput: NLPClientInput}); //Sends back this output in JSON format (Put info in brackets)
  console.log("Server sending: " + NLPClientInput);


});



function spelling(string){
  const lines = fs.readFileSync('dictionary.txt', 'utf-8').split(/\r?\n/);//frequency dictionary
  const ngrams = new NGrams({ byWord: true });
  const freqs = ngrams.getNGramsFreqs(lines, 1);
  const spellCheck = new SpellCheck({ features: freqs });
   
  //split into separate words array
  var spellCheckArray = string.split(" ");
  console.log("array to be checked: "+spellCheckArray);
  
  //loop through each word in array
  //if wrong replace with corrected word
  for(var i = 0; i<spellCheckArray.length; i++){//for each word in spellCheckArray
    if (spellingDetection.check(spellCheckArray[i]).length>0){//if check returns an array of length>0, then the word is misspelled
      console.log("word to be corrected: "+ spellingDetection.check(spellCheckArray[i]));
      console.log("spellcheckarray[i]: "+spellCheckArray[i]);
      const correction = spellCheck.check([spellCheckArray[i]]);
      console.log(correction);
      spellCheckArray[i]= correction[0];//replace word with correction
    }
  }
  //turn corrected array into sentence
  var spellCheckedSentence = spellCheckArray.join(" ");
  console.log("array: " +spellCheckedSentence);
  return spellCheckedSentence;
}


function sentimentAnalysis(string) {
  const sentiment = new SentimentAnalyzer({ language: 'en' });
  sentiment
    .getSentiment(string)
    .then(result => console.log(result))

}
//////wikipedia//////////////////
function wikipedia(string){
 
  //var query = string;
  var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${string} +"&format=json`
  
  pkg2(url, function(err, response, body) {
    if (err) {
        var error = "cannot connect to the server";
        console.log(error);
    } else {
        var wiki = JSON.parse(body);
        for (var i = 0; i < wiki[1].length; i++) {
            var message = `You searched for ${wiki[1][i]}: And these are the details - ${wiki[2][i]} Follow this link to read more - ${wiki[3][i]}` + "\n";
            console.log(message);
           
        }
        console.log("-------------End of Wikipedia API-------------");
  
    }
  
  });
}

/////////////google translate///////////////////
function translater(string){
  pkg( string , {to: 'en'}).then(res => {
    console.log(res.text);

    console.log(res.from.language.iso);
    //=> nl
    console.log("-------------End of Google Translate API-------------");
}).catch(err => {
    console.error(err);
});
}
    

app.listen(1337);

// Create your instance of wink ner & use default config.
var myNER = ner();
// Define training data.
var trainingData = [
  { text: 'manchester united', entityType: 'club', uid: 'manu' },
  { text: 'manchester', entityType: 'city' },
  { text: 'U K', entityType: 'country', uid: 'uk' }
];
// Learn from the training data.
myNER.learn( trainingData );
// Since recognize() requires tokens, use wink-tokenizer.
// Instantiate it and extract tokenize() api.
var tokenize = winkTokenizer().tokenize;
// Tokenize the sentence.
var tokens = tokenize( 'Manchester United is a football club based in Manchester, U. K.' );
// Simply Detect entities!
tokens = myNER.recognize( tokens );
console.log( tokens );
// -> [
//      { entityType: 'club', uid: 'manu', originalSeq: [ 'Manchester', 'United' ],
//        value: 'manchester united', tag: 'word' },
//      { value: 'is', tag: 'word' },
//      { value: 'a', tag: 'word' },
//      { value: 'football', tag: 'word' },
//      { value: 'club', tag: 'word' },
//      { value: 'based', tag: 'word' },
//      { value: 'in', tag: 'word' },
//      { entityType: 'city', value: 'Manchester', tag: 'word',
//        originalSeq: [ 'Manchester' ], uid: 'manchester' },
//      { value: ',', tag: 'punctuation' },
//      { entityType: 'country', uid: 'uk', originalSeq: [ 'U', '.', 'K' ],
//        value: 'u k', tag: 'word' },
//      { value: '.', tag: 'punctuation' }
//    ]

spellingDetection.load('en');//load english dictionary
const lines = fs.readFileSync('outstanding.txt', 'utf-8').split(/\r?\n/);
const ngrams = new NGrams({ byWord: true });
const freqs = ngrams.getNGramsFreqs(lines, 1);
const spellCheck = new SpellCheck({ features: freqs });
 
//split into separate words array
var sampleText = "helo my naem is Megan nicee to meeet youo";
var spellCheckArray = sampleText.split(" ");
console.log("array to be checked: "+spellCheckArray);

//loop through each word in array
//if wrong replace with corrected word
for(var i = 0; i<spellCheckArray.length; i++){//for each word in spellCheckArray
  if (spellingDetection.check(spellCheckArray[i]).length>0){//if check returns an array of length>0, then the word is misspelled
    console.log("word to be corrected: "+ spellingDetection.check(spellCheckArray[i]));
    console.log("spellcheckarray[i]: "+spellCheckArray[i]);
    const correction = spellCheck.check([spellCheckArray[i]]);
    console.log(correction);
    spellCheckArray[i]= correction[0];//replace word with correction
  }
}
//turn corrected array into sentence
var spellCheckedSentence = spellCheckArray.join(" ");
console.log("array: " +spellCheckedSentence);


// Create your instance of wink ner & use default config.
var myNER = ner();
// Define training data.

// var trainData2 = prompts; //
// myNER.learn( trainData2 ); //

var trainingData = [
  { text: 'Shrek', entityType: 'name', uid: 'name' },
  { text: 'my', entityType: 'noun' },
  { text: 'is', entityType: 'verb' },
  { text: 'name', entityType: 'noun' }
];
// Learn from the training data.
myNER.learn( trainingData );
// Since recognize() requires tokens, use wink-tokenizer.
// Instantiate it and extract tokenize() api.
var tokenize = winkTokenizer().tokenize;
// Tokenize the sentence.
var tokens = tokenize( 'My name is Shrek' );
// Simply Detect entities!
tokens = myNER.recognize( tokens );
console.log( tokens )
