const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
      minlength: 3,
      trim: true,
    },

    phone: {
      type: String,
      unique: [true, "Phone is Already Registered!"],
      required: [true, "Phone number is required!"],
      minlength: [10, "Mobile number should be more than 10 number"],
      trim: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Invalid Phone Number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [4, "Password should be greater than or equal 4 character!"],
    },

    role: {
      type: String,
      default: "user",
      enum: ["admin", "merchant", "user"],
    },
    notification: { type: Boolean },
    pushNotification: { type: Boolean },
    fingerprint: { type: Boolean },
    twofactorAuth: { type: Boolean },
    profile: {
      type: Object,
    },
    gigs: [{ type: Schema.Types.ObjectId, ref: "Gigs" }],

    reviewReciver: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    reviewUser: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
