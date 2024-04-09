import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  photo: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  quiz_scores: {
    type: Array,
  },
  orders: {
    type: Array,
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
