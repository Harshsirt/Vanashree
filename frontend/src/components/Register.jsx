import { useState } from "react"

export default function Register({ goLogin }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpbutton, setOtpButton] = useState("Send OTP");
  const [msg, setMsg] = useState("")

  const sendEmailOtp = async () => {
    if (!email) return setMsg("Enter email first")
    setOtpButton("Sending...")
    const res = await fetch("http://localhost:5000/api/sendotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    setShowOtp(true)
    setOtpButton("OTP Resent")   
    setMsg(data.msg)            
  }

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/verifyOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    })
    const data = await res.json()
    setMsg(data.msg)
    if (data.msg === "OTP verified") setOtpVerified(true)
  }

 const handleRegister = async () => {
    if (!otpVerified) return setMsg("Verify OTP first")
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, password })
    })
    const data = await res.json()
    setMsg(data.msg)
    if (data.msg === "Registered") goLogin()
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2" />
      <input placeholder="Phone no" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border p-2" />
      <div className="flex gap-2">
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value.trim().toLowerCase())} className="w-full border p-2" />

        <button onClick={sendEmailOtp} className="bg-green-600 text-white px-3">{otpbutton}</button>
      </div>

      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2" />
      {showOtp && (
        <div className="flex gap-2">
          <input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value.trim())} className="w-full border p-2" />
          <button onClick={verifyOtp} className="bg-blue-600 text-white px-3">Verify</button>
        </div>
      )}
      <button onClick={handleRegister} className="w-full bg-green-600 text-white py-2">Register</button>
      <p onClick={goLogin} className="text-blue-500 cursor-pointer">
        <span className="text-black">Already have account? </span>Login
      </p>
       {msg && <p className="text-sm text-gray-600">{msg}</p>}
    
    </div>
  )
}
