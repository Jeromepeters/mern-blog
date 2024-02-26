import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,

      required: true,
      minlength: 8,
      validate: {
        validator: (value) => {
          // Regular expression for password complexity
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&*])(?=.{8,})/;
          return regex.test(value);
        },
        message:
          "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and special character.",
      },
    },
  },
  [
    {
      timestamps: true,
    },
  ]
);

const User = mongoose.model("User", userSchema);
export default User;
