import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { AppointmentsCollection } from "/imports/db/appointmentsCollection";
import { AppointmentSchema, Appointment } from "./appointment";

Meteor.methods({
  async "appointments.create"(appointment: Appointment) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const parsedAppointment = await AppointmentSchema.safeParseAsync(
      appointment
    );

    if (parsedAppointment.success) {
      await AppointmentsCollection.insertAsync({
        ...appointment,
        userId: this.userId,
      });
    } else {
      throw new Meteor.Error(parsedAppointment.error.message);
    }
  },

  async "appointments.update"(nextAppointment: Appointment) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const parsedAppointment = await AppointmentSchema.safeParseAsync(
      nextAppointment
    );

    if (!parsedAppointment.success) {
      throw new Meteor.Error(parsedAppointment.error.message);
    }

    check(nextAppointment._id, String);

    const prevAppointment = await AppointmentsCollection.findOneAsync({
      _id: nextAppointment._id,
      userId: this.userId,
    });

    if (!prevAppointment) {
      throw new Meteor.Error("Access denied.");
    }

    // destructure the updated appointment data to fit the
    // updateAsync mongo API
    const { _id: appId, ...updateData } = nextAppointment;

    AppointmentsCollection.updateAsync(appId, {
      $set: {
        ...updateData,
      },
    });
  },
});
