const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey-to-do.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://to-do-app-43071.firebaseio.com"
});
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);


exports.createUserDoc = functions.auth.user().onCreate((user) => {

  return db.collection("users").doc(user.uid).set({
    email: user.email,
    timeStamp: null,
    hideCompleted: false,
  });

});

exports.deleteUserDoc = functions.auth.user().onDelete((user) => {
  let userRef = db.collection("users").doc(user.uid);
  
  return userRef.delete();

});

exports.deleteListDoc = functions.firestore.document('lists/{listID}').onDelete((snap, context) => {
  let list = snap.data();

  let tasksRef = db.collection("tasks").where('listName', '==', list.name);


  return tasksRef.get().then(querySnapshot => {
    var batch = db.batch();

    querySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    return (batch.commit());
  });

});
