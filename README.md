# Firebase Backup Node

Node.js app to perform Firebase backups.

### How to use it

NOTE: setup the configurations first

#### Run from the command line

    $ node firebase-backup.js

#### Setup a cron job

    $ crontab -e

    > # Usage: minute hour day-of-month month day-of-week command
    > # Examples: run a command every monday at 5:30 in afternoon
    > 30 17 * * 1 cd && /usr/local/bin/node firebase-backup.js
    > # or every 15 minutes
    > */15 * * * * cd && /usr/local/bin/node firebase-backup.js