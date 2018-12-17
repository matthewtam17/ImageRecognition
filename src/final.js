const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// The Firebase Admin SDK to access the Firebase Realtime Database.

const functions = require('firebase-functions');
var Tesseract = require('tesseract.js')
//var serviceAccount = require('../functions/hackkingsimage-firebase-adminsdk-yedvh-c31d48914b.json');
// const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// adminConfig.credential = admin.credential.cert(serviceAccount);
// admin.initializeApp(adminConfig);
// admin.initializeApp();
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://hackkingsimage.firebaseio.com'
// });
function runOCR(url) {
    Tesseract.recognize(url)
         .then(function(result) {
                    console.log(result.text);
                    return result.text;
         });
}
exports.textRecog = functions.https.onCall((identity) => {
  admin.database().ref('/captures/'+identity+"/image/").once('value').then(function(photostore){
    var picture = (photostore.val())
    runOCR(picture).then(function(text){
      admin.database().ref('/captures/'+identity+'/text/').set(text);
    });
  });
});

const key = "AIzaSyB9mVc1uSKA28UW5ZbDz1EB1550MmLQWoI";

const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();
client
  .labelDetection('https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    var text = JSON.stringify(labels[0].description);
    admin.database().ref('/users/'+identity+'/text/').set(text);
    //labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });