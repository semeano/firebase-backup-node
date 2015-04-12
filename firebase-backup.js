// **************
// Configurations
// **************

// Node.js binary
var nodeLocation = '/usr/local/bin/node';
// Firebase library for Node.js (npm install firebase)
var firebaseLibrary = '/usr/local/lib/node_modules/firebase/lib/firebase-node.js';
// Firebase token generator library (npm install firebase-token-generator)
var firebaseTokenLibrary = '/usr/local/lib/node_modules/firebase-token-generator/dist/firebase-token-generator-node.js';
// Where all backup files will be saved
var backupLocation = 'backups';
// Your Firebase URL
var firebaseURL = 'https://your.firebaseio.com/';
// Your Firebase secret
var firebaseSecret = 'AWBlgJWYXiwNxn7QPnWXtgWWIg1Y04HOGRfV99Az';



// ********************************
// App (don't edit below this line)
// ********************************

console.log('Starting Firebase backup...');

var fs = require('fs');
var Firebase = require(firebaseLibrary);
var FirebaseTokenGenerator = require(firebaseTokenLibrary);

var tokenGen = new FirebaseTokenGenerator(firebaseSecret);
var token = tokenGen.createToken({}, {admin: true});

var rootRef = new Firebase(firebaseURL);

rootRef.authWithCustomToken(token, function (error) {

	if (error) {
		console.log(error);
		process.exit();
	} else {
		rootRef.once('value', function (snapshot) {
			// Construct a filename based on today's date and the exact time in milliseconds
			var now = new Date();
			var filename = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '_' + now.getTime() + '.json';

			fs.writeFile(backupLocation + '/' + filename, JSON.stringify(snapshot.exportVal()), function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Backup saved! - ' + filename);
				}
		
				// All done, quit node.js
				process.exit();
			});

			rootRef.unauth();
		});
	}
});
