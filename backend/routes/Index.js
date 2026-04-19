const express = require("express")
const passport = require("passport")
const nodemailer = require("nodemailer")
const User = require("../views/user.js")

const router = express.Router()
let otpStore = {}


router.post("/sendotp", async (req, res) => {
  const { email } = req.body
  const otp = Math.floor(1000 + Math.random() * 9000)
  otpStore[email] = { otp, expiresAt: Date.now() + 60 * 1000 }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,      
        pass: process.env.EMAIL_PASS          
      }
    })

    await transporter.sendMail({
      from: `Vanashree App <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. Valid for 1 minute.`
    })

    res.json({ msg: "OTP sent" })
  } catch (err) {
    res.json({ msg: "Error sending OTP", error: err.message })
  }
})


router.post("/verifyOtp", (req, res) => {
  const { email, otp } = req.body
  const record = otpStore[email]
  if (!record) return res.json({ msg: "No OTP found" })
  if (Date.now() > record.expiresAt) return res.json({ msg: "OTP expired" })
  if (String(record.otp) !== String(otp)) return res.json({ msg: "Wrong OTP" })
  record.verified = true
  res.json({ msg: "OTP verified" })
})


router.post("/register", (req, res) => {
  const { name, phone, email, password } = req.body
  const record = otpStore[email]

  if (!record?.verified) {
    return res.json({ msg: "Verify OTP first" })
  }

  User.register(
    new User({ name, phone, verified: true, email }),
    password,
    (err, user) => {
      if (err) {
        console.error("Register error:", err)
        return res.json({ msg: "Error registering", error: err.message })
      }
      delete otpStore[email]
      res.json({ msg: "Registered" })
    }
  )
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user.verified) return res.json({ msg: "Not verified" })
  res.json({ msg: "Login success", user: req.user })
})

module.exports = router;
