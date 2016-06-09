# Default IBM V18 NodeJS Project - Bare Bones Starting Point

## Project Overview

This repository is intended to support Havas internal development, with delivery of compiled HTML, etc. to be provided to Team WCM
and is meant to be an initial effort to create a starting point for a new project - devoid of prior project custom artifacts.
Cheers!

## Architecture

### Node.js + Express.js application

1. Run 'npm install' after checkout & 'npm install -g nodemon' & 'nodemon app' to get started in development mode locally.
2. Application is also configured for bluemix deployment, but please keep instances to a minimum due to sensitive nature of this project.

### Database

CouchDB for local DB work / Uses cloudant instance when pushed to bluemix.

1. Install Mac binary from http://couchdb.apache.org/
2. See the admin interface run in your browser when you launch the app
3. create an admin user with 'admin' for the username and 'localpassword' as the password.

### v18 (IBM Design System)

This app contains a local snapshot copy of IBM's Bootstrap v18 (aka Northstar?) source files. Has own gruntfile and documentation.

**One setup task here:** If you want to experiment with extensions to v18, modify files within the source directory and point to those built files - follow these steps to build new versions with your modifications:

1. cd app/public/v18/
2. npm install
3. grunt build-all

Let that task complete and then you will have locally built copies of the v18 framework files available to our pages.

If you get errors (and you might) all you really need are the css and js tasks

1. grunt build-js:basic
2. grunt build-css:basic

For new interactive development please work locally within our application at first, before customizations can be identified for potential merging with v18. Be wary of changing v18 files at first until you are more familiar with the framework.

### Compass / Sass for styling

1. Install from - http://compass-style.org/
2. 'cd app/public' && 'compass watch' to get started watching sass files for changes.

### Jade for HTML view templating

1. http://jade-lang.com/reference/

### Local CMS

See config/index.js

## Contact

kevin.haggerty@havasww.com for any questions, comments, concerns, etc.
