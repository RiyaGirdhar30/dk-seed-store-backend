import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    profileImage: {
  type: String,
  default: ""
},  


    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
  name: { type: String },
  phone: { type: String },
  addressLine: { type: String },
  city: { type: String },
  pincode: { type: String }
},
    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },


    resetToken: {
  type: String,
},
resetTokenExpiry: {
  type: Date,
},

  },

  { timestamps: true } // ⭐ automatically adds createdAt, updatedAt
);

export default mongoose.model("User", userSchema);
