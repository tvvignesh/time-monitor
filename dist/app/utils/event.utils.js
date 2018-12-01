"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(__dirname, "../../../token.json");
const CREDENTIALS_PATH = path.join(__dirname, '../../../credentials.json');
function addGCalEvent(event, auth) {
    const calendar = google.calendar({
        version: 'v3', auth
    });
    console.log('---event::', event);
    let eventDetails = {
        summary: event.metaData.eventTitle,
        location: event.metaData.location || 'INDIA',
        description: event.metaData.eventDescription || 'Event created by Time Monitor',
        start: {
            dateTime: new Date(event.metaData["eventStartTime"]).toISOString(),
            timeZone: 'Asia/Kolkata'
        },
        end: {
            dateTime: new Date(event.metaData["eventEndTime"]).toISOString(),
            timeZone: 'Asia/Kolkata'
        },
        recurrence: [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        attendees: [
            { email: 'vigneshviswam@gmail.com' }
        ],
        reminders: {
            useDefault: false,
            overrides: [
                {
                    method: 'email', minutes: 24 * 60
                },
                {
                    method: 'popup', minutes: 10
                }
            ]
        }
    };
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: eventDetails
    }, function (err, eventObj) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: %s', eventObj.htmlLink);
    });
}
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                return console.error('Error retrieving access token', err);
            }
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err) {
                    console.error(err);
                }
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
exports.getEvent = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.find(eventObj).toArray(function (err, docs) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.findEvents = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.find(eventObj).toArray(function (err, docs) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.pushEvent = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.insertMany([
        {
            title: eventObj.metaData.eventTitle,
            tags: eventObj.metaData.eventTags,
            uid: "1234",
            time: eventObj.metaData.time,
            location: "gps-coord",
            duration: "1 hour",
            metadata: eventObj.metaData
        }
    ], function (err, result) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Created Event successfully!");
        callback(result);
    });
};
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return getAccessToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
exports.addEventToGoogle = function (event, callback) {
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) {
            return console.log('Error loading client secret file:', err);
        }
        authorize(JSON.parse(content), function (auth) {
            addGCalEvent(event, auth);
            callback();
        });
    });
};
//# sourceMappingURL=event.utils.js.map