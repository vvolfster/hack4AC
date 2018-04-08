const functions = require('firebase-functions');
const Twilio = require('twilio');
const lodash = require('lodash')
const tableify = require('tableify');
const serviceAccount = require('./secret/serviceAcct');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({
    apiKey: 'key-9afa0b7ba4eb2002ba158df2d3bdde37',
    domain: 'warm.zabaat.com'
});

// Find your account sid and auth token in your Twilio account Console.
const client = new Twilio('AC675443ee6c011cb1906c73c70680c308', 'a9fa382167758a638ea60faf5848673b');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://warmingn-5dbc7.firebaseio.com'
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.status(200).send('Hello world');
});

exports.emailReport = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        admin.database().ref('/org/egan/site').once('value', (snapshot) => {
            const sites = snapshot.val()
            const reportData = lodash.transform(sites, (a, e) => {
                if(e.active){
                    const temp = {
                        Name: e.title,
                        "Guest Count": e.guest.current,
                        "Pet Count": e.pets.current,
                        Volunteer: e.volunteer.current
                    }
                    a.push(temp)
                }
                return a
            }, [])
            const reportHTML = tableify(reportData)
            const data = {
                from: 'Admin <postmaster@warm.zabaat.com>',
                to: 'brett@zabaat.com',
                subject: 'Message Received',
                html: reportHTML
            };
            const mail = new MailComposer(data);
            mail.compile().build((err, message) => {
                const dataToSend = {
                    to: 'brett@zabaat.com',
                    message: message.toString('ascii')
                };

                mailgun.messages().sendMime(dataToSend, (sendError) => {
                    if (sendError) {
                        console.log(sendError);
                    }
                });
            });
        })

        response.status(200).send('sent Email');
    })
});

exports.sendEmergencySMS = functions.https.onRequest((request, response) => {
    // Send the text message.
    cors(request, response, () => {
        console.log("request body", request.body)
        client.messages.create({
            to: request.body.to,
            from: '+15412348087',
            // body: `an emergency call was made from ${request.body.siteName}`
            body: `TEST FAKE emergency call was made from ${request.body.siteName}`
        });
        return response.status(200).send('sent SMS');
    })
});

exports.fooBar = functions.database.ref('foo/{id}').onCreate(event => {
    console.log(event.params.id);
});

exports.inviteAdd = functions.database.ref('org/{orgId}/invites/{id}').onCreate((snapshot, context) => {
    let textBody = 'Welcome to ';
    textBody += snapshot.val().orgId;
    textBody += '\nPlease click the following link to accept the invitation \n ';
    textBody += 'http://warm.zabaat.com/?compositeInviteId=';
    textBody += snapshot.val().orgId;
    textBody += '@@@';
    textBody += context.params.id;
    const data = {
        from: 'Admin <postmaster@warm.zabaat.com>',
        to: snapshot.val().email,
        subject: 'Welcome! You are invited to join the Shrimps!',
        text: textBody
    };
    mailgun.messages().send(data, (error, body) => {
        console.log(body);
    });
    return 1;
});
