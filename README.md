# Appointment booking sketch

A small "appointment booking" system, using Meteor.js 3 (rc 4), React and Typescript.

The app is very, very bare-bones and lack all but the most minimal styling.

Functionality included is listing appointments, filtering appointments, creating new appointments and editing appointments. (Note: Deleting appointments is not supported... )

## Prerequisites:

This app is built using meteor 3, which can be installed with

```sh
curl https://install.meteor.com/\?release\=3.0-rc.4 | sh
```

It also needs Node.js 20 (LTS) installed.

## Run in test mode

```sh
npm start
```

from the root should suffice to start the app. There are three environment variables that might be set to configure the test users and the number of example appointments created

```sh
export APP_BOOK_TEST_USERS="test1,test2"
export APP_BOOK_TEST_PW="test"
export APP_BOOK_NUM_FAKE_BOOKINGS=40
```

If you start the app with `npm start` these values will be pre-set, but if you start with `meteor run` you need to set them manually.
