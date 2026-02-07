import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  role?: string;
  department?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  role: { type: String, enum: ['Student', 'Professor', 'Historian'] },
  department: { type: String },
  country: { type: String },
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export type InsertUser = {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  role?: string;
  department?: string;
  country?: string;
};

export interface IResearchFile {
  name: string;
  size: number;
  type: string;
}

export interface IResearchReport extends Document {
  _id: string;
  files: IResearchFile[];
  uploaderName?: string;
  uploaderEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResearchReportSchema = new Schema<IResearchReport>(
  {
    files: [
      {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true },
      },
    ],
    uploaderName: { type: String },
    uploaderEmail: { type: String },
  },
  {
    timestamps: true,
    collection: "heritage",
  },
);

export const ResearchReport =
  mongoose.models.ResearchReport ||
  mongoose.model<IResearchReport>("ResearchReport", ResearchReportSchema);
