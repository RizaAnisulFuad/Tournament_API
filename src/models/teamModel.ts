import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  teamName: string;
  members: [
    {
      name: string;
      phone: string;
      gender: string;
    }
  ];
}

const TeamSchema: Schema = new Schema({
  teamName: { type: String, required: true, unique: true },
  members: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      gender: { type: String, required: true, enum: ['Man', 'Woman'] },
    }
  ],
});

export default mongoose.model<ITeam>('Team', TeamSchema);
