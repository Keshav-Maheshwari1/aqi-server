import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email validation
        },
        message: "Invalid email format.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "govt","user"],
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);
export default User;
