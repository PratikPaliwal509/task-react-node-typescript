import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

const StudentSchema: Schema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    dob: String,
    gender: String,
    address: String,
    course: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", StudentSchema);