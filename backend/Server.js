require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const User = require("./views/user.js")


mongoose.connect(process.env.MONGO_URI)

const app = express()
app.use(cors())
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,   
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const authRoutes = require("./routes/index.js")
app.use("/api", authRoutes)

app.listen(process.env.PORT);
