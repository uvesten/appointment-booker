import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { faker } from "@faker-js/faker";

import { AppointmentsCollection } from "/imports/db/appointmentsCollection";
import { Appointment } from "/imports/api/appointment";
import "/imports/api/appointmentMethods";
import "/imports/api/appointmentsPublications";

/**
 * Create and insert a fake appointment into the "appointments"
 * collection.
 *
 * @param uid the user to create the fake appointment for
 */
async function insertFakeAppointment(uid: string) {
  const now = new Date();
  const fakeAppointment: Appointment = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateStr: faker.date
      .soon({ days: 30, refDate: now })
      .toISOString()
      .split("T")[0],
  };
  AppointmentsCollection.insertAsync({ ...fakeAppointment, userId: uid });
}

Meteor.startup(async () => {
  const testUserNames = (process.env.APP_BOOK_TEST_USERS ?? "")
    .split(",")
    .map((name) => name.trim());

  const testPassword = process.env.APP_BOOK_TEST_PW;

  // If the user does not provide APP_BOOK_NUM_FAKE_BOOKINGS or provides
  // an invalid string, set number of fake entries to 40
  const parsedNumFake = parseInt(process.env.APP_BOOK_NUM_FAKE_BOOKINGS ?? "");
  const numFakeBookings = !isNaN(parsedNumFake) ? parsedNumFake : 40;

  // If we have test users and a set test password, set up test users and data
  if (testUserNames.length > 0 && typeof testPassword !== "undefined") {
    const testUids: string[] = [];

    for (const name of testUserNames) {
      const uid = await Accounts.findUserByUsername(name);

      if (!uid) {
        testUids.push(
          await Accounts.createUserAsync({
            username: name,
            password: testPassword,
          })
        );
      } else {
        testUids.push(uid._id);
      }
    }

    // If we're testing, and the appointments collection is empty, add
    // APP_BOOK_NUM_FAKE_BOOKINGS split evenlish among the test users
    if ((await AppointmentsCollection.find().countAsync()) === 0) {
      const bookingsPerUser = numFakeBookings / testUids.length;
      for (const uid of testUids) {
        for (let i = 0; i < bookingsPerUser; i += 1) {
          insertFakeAppointment(uid);
        }
      }
    }
  }
});
