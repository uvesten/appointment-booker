import React, { ChangeEvent, useState } from "react";
import { Appointment } from "../api/appointment";
import { AppointmentView } from "./AppointmentView";

export const Listing = ({
  appointments,
  handleEdit,
}: {
  appointments: Appointment[];
  handleEdit: (appointment: Appointment) => void;
}) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredAppointments = appointments
    ? appointments.filter(
        (appointment) =>
          appointment.firstName
            .toLowerCase()
            .startsWith(filter.toLowerCase()) ||
          appointment.lastName.toLowerCase().startsWith(filter.toLowerCase())
      )
    : [];

  return (
    <div className="listing">
      <input
        type="text"
        placeholder="Filter appointments"
        value={filter}
        onChange={handleFilterChange}
      />
      <div className="appointments">
        {filteredAppointments.map((appointment, index) => (
          <AppointmentView
            key={index}
            appointment={appointment}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};
