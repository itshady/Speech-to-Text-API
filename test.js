/*var http = require('http');
 http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Hello World!');
 }).listen(8080);*/

 var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(transcript);
  }).listen(8080);

 const fs = require('fs');
 const { IamAuthenticator } = require('ibm-watson/auth');
 const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
 
 const speechToText = new SpeechToTextV1({
   authenticator: new IamAuthenticator({
     apikey: 'xL5Ors1R8wqxrs2ySRBlKlc72OYxORVT8E-O_UCVgfgr',
   }),
   serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/b2ed44f3-aa47-47b8-b871-5867594408e8',
 });
 
 const params = {
   objectMode: true,
   contentType: 'audio/mp3',
   model: 'en-US_BroadbandModel',
   maxAlternatives: 1,
 };
 
 // Create the stream.
 const recognizeStream = speechToText.recognizeUsingWebSocket(params);
 
 // Pipe in the audio.
 fs.createReadStream('audio2.mp3').pipe(recognizeStream);
 
 /*
  * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
  *
  * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
  * file and produce it on the console.
  *
  * WHEN USED ALONE, the following line pipes just the final transcript to
  * the named file but produces numeric values rather than strings on the
  * console.
  */
 // recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
 
 /*
  * WHEN USED ALONE, the following line produces just the final transcript
  * on the console.
  */
 // recognizeStream.setEncoding('utf8');
 
 // Listen for events.
 recognizeStream.on('data', function(event) { onEvent('Results:', event); });
 recognizeStream.on('error', function(event) { onEvent('Error:', event); });
 //recognizeStream.on('close', function(event) { onEvent('Close:', event); });
 
 // Display events on the console.
 function onEvent(name, event) {
    let transcript = "";
    let average = 0;
    //const data = JSON.stringify(event, null, 2);
    //console.log(name, event.results[0].alternatives[0].transcript);
    //foreach through alternatives
    event.results.forEach(element => transcript += element.alternatives[0].transcript);
    event.results.forEach(element => average += element.alternatives[0].confidence);
    console.log(average/event.results.length);
    console.log(transcript);

 };