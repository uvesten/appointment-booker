import { Meteor } from "meteor/meteor";

import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { AppointmentsCollection } from "../db/appointmentsCollection";
import { Listing } from "./Listing";
import { Editor } from "./Editor";
import { Appointment } from "../api/appointment";

export const App = () => {
  const [currentEditing, setCurrentEditing] = useState<Appointment | undefined>(
    undefined
  );

  const onEditAppointment = (appointment: Appointment): void => {
    setCurrentEditing(appointment);
  };

  const cancelCurrentEdit = () => setCurrentEditing(undefined);
  const saveAppointment = (appointment: Appointment) => {
    if (appointment._id) {
      // update the existing appointment
      Meteor.call("appointments.update", appointment);
    } else {
      // create a new appointment
      Meteor.call("appointments.create", appointment);
    }
    cancelCurrentEdit();
  };

  const user = useTracker(() => Meteor.user());
  const { appointments } = useTracker(() => {
    const noDataAvailable = { appointments: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("appointments");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const appointments = AppointmentsCollection.find(
      {},
      { sort: { dateStr: 1 } }
    ).fetch();

    return { appointments };
  });

  return (
    <div className="main">
      {user ? (
        <div className="container">
          <Editor
            appointment={currentEditing}
            onCancel={cancelCurrentEdit}
            onSave={saveAppointment}
          />

          <Listing appointments={appointments} handleEdit={onEditAppointment} />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
