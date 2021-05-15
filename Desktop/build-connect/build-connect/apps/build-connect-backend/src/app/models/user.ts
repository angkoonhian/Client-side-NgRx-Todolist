import * as mongoose from 'mongoose';

export interface Iuser extends mongoose.Document {
  _username: string;
  _password: string;
}

export const UserSchema = new mongoose.Schema(
  {
    _username: {
      type: String,
      required: true,
      unique: true
    },
    _password: {
      type: String,
      required: true
    }
  },
  { collection: 'users' }
);

const User = mongoose.model<Iuser>('users', UserSchema);
export default User;
