# Firebase Backup Node

1. Install dependencies:

	$ npm install -g firebase
	$ npm install -g firebase-token-generator

	(you might need sudo)

2. Create the cron job (to run every minute)

	$ crontab -u <user> -e
	> * * * * * cd && /usr/bin/node firebase-backup.js

*Notes:*

- Don't forget to set write permissions on the backups folder
- The full path to node is '/usr/bin/node' on Linux and '/usr/local/bin/node' on Mac.