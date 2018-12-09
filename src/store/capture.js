import { firebaseAction } from 'vuexfire';
import db from '@/db';
import router from '@/router';
import firebase from '@/firebase';
var Tesseract = require('tesseract.js')
const captures = db.collection('captures');
const storageRef = firebase.storage().ref();

https://us-central1-<project-id>.cloudfunctions.net/date

const state = {
  blobs: [],
  captures: [],
  text:[],
};

function getText(image){
  Tesseract.recognize(image)
         .progress(function  (p) { console.log('progress', p)    })
         .then(function (result) { console.log('result', result) })
  }

// function httpGetAsync(downloadURL, callback){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", 'https://us-central1-hackkingsimage.cloudfunctions.net/textRecog?identity'+, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

const getters = {
  get_blobs_length (state) {
    return state.blobs.length
  },
  blob_to_url (state) {
    const blob = state.blobs[state.blobs.length-1];
    const objectURL  = URL.createObjectURL(blob);
    return objectURL;
  },
};

const mutations = {
  KEEP_BLOB(state, newBlob) {
    state.blobs.push(newBlob);
  },
};

const actions = {
  async captureBlob({ state }) {
    const user_id = await firebase.auth().currentUser.uid;
    const created_at = await firebase.firestore.FieldValue.serverTimestamp();
    const blob = state.blobs.pop();
    const uploadTask = storageRef.child('images/'+user_id+created_at).put(blob);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    await uploadTask.on('state_changed', function(snapshot){
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        const capture = {
          user_id: user_id,
          created_at: created_at,
          blob_url: downloadURL,
        };
        captures.add(capture);
        getText(blob);
        //httpGetAsync(downloadURL);
      });
    });
  },
  async keepBlob(context, newBlob) {
    await context.commit('KEEP_BLOB', newBlob);
  },
  initQuests: firebaseAction(({ bindFirebaseRef }, name) => {
    bindFirebaseRef('quests', db.collection('quests').where('name', '==', name));
  }),
  init: firebaseAction(({ bindFirebaseRef }, capture) => {
    bindFirebaseRef('capture', db.collection('captures'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
