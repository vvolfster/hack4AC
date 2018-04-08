const functions = require('firebase-functions');
const serviceAccount = require("./secret/serviceAcct")
const admin = require("firebase-admin");
const mailgun = require('mailgun-js')({
    apiKey: 'key-9afa0b7ba4eb2002ba158df2d3bdde37',
    domain: 'warm.zabaat.com'
});

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

exports.inviteAdd = functions.database.ref("org/{orgId}/invites/{id}").onCreate((snapshot, context) => {
    let textBody = "Welcome to "
    textBody += snapshot.val().orgId
    textBody += "Please click the following link to accept the invitation <br/>"
    textBody += "http://localhost:8080/login?key="
    textBody += context.params.id
    const data = {
        from: 'Admin <postmaster@warm.zabaat.com>',
        to: snapshot.val().email,
        subject: 'Message Received',
        text: textBody
    };
    mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });
    return 1
})

