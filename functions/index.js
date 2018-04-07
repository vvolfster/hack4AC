const functions = require('firebase-functions');
const serviceAccount = require("./secret/serviceAcct")
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://warmingn-5dbc7.firebaseio.com"
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.status(200).send("Hello world")
})

exports.fooBar = functions.database.ref("foo/{id}").onCreate((event) => {
    console.log(event.params.id)
})
