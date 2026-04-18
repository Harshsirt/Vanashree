const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  verified: { type: Boolean, default: false }
  // email removed — plm manages it automatically
})

userSchema.plugin(plm, { usernameField: "email" })

module.exports = mongoose.model("User", userSchema, "userdata")