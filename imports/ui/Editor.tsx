import React, { useState, useEffect } from "react";
import { Appointment, AppointmentSchema } from "../api/appointment";

export const Editor = ({
  appointment,
  onSave,
  onCancel,
}: {
  appointment: Appointment | undefined;
  onSave: (appointment: Appointment) => void;
  onCancel: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateStr, setDateStr] = useState("");
  // TODO: Display error messages in form.
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (appointment) {
      setFirstName(appointment.firstName);
      setLastName(appointment.lastName);
      setDateStr(appointment.dateStr);
    } else {
      setFirstName("");
      setLastName("");
      setDateStr("");
    }
  }, [appointment]);

  const handleSave = () => {
    const parsedAppointment = AppointmentSchema.safeParse({
      firstName,
      lastName,
      dateStr,
      _id: appointment?._id,
    });
    if (parsedAppointment.success) {
      onSave(parsedAppointment.data);
    } else {
      setErrorMessage(parsedAppointment.error.message);
    }
  };
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setDateStr("");
    onCancel();
  };

  return (
    <div className="editor">
      <h2>{appointment ? "Edit Appointment" : "Add New Appointment"}</h2>
      <form>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
