import { z } from "zod";

export const AppointmentSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  /** Only strings on YYYY-mm-dd format are allowed */
  dateStr: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
