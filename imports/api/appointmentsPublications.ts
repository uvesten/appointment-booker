import { Meteor } from "meteor/meteor";
import { AppointmentsCollection } from "/imports/db/appointmentsCollection";

Meteor.publish("appointments", function publishAppointments() {
  return AppointmentsCollection.find({ userId: this.userId ?? "INVALID_USER" });
});
