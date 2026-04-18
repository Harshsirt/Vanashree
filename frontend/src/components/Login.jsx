import { useState } from "react"

export default function Login({ login, guest, goRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleLogin = async () => {
  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  
  if (data.msg === "Login success") {
    login(data.user)  
  } else {
    alert(data.msg)  
  }
}
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-center text-lg font-semibold">Login</h2>
      <input placeholder="Email" className="w-full border p-2" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full border p-2" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-green-600 text-white py-2">Login</button>
      <button onClick={guest} className="w-full border py-2">Continue as Guest</button>
      <p className="text-center">Don't have account? <span onClick={goRegister} className="text-green-600 cursor-pointer">Register</span></p>
    </div>
  )
}
