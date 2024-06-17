import { Mongo } from "meteor/mongo";
import { Appointment } from "../api/appointment";

export const AppointmentsCollection = new Mongo.Collection<
  // separate out the userId from the schema / base type,
  // since the client does not need to know about it
  Appointment & { userId: string }
>("appointments");
