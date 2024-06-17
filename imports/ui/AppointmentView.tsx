import React from "react";
import { Appointment } from "../api/appointment";

export const AppointmentView = ({
  appointment,
  handleEdit,
}: {
  appointment: Appointment;
  handleEdit: (appointment: Appointment) => void;
}) => {
  return (
    <div className="appointment">
      <p>
        {appointment.firstName} {appointment.lastName}
      </p>
      <p>{appointment.dateStr}</p>
      <button onClick={() => handleEdit(appointment)} className="edit-button">
        ✏️
      </button>
    </div>
  );
};
