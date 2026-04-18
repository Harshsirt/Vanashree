import { useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import AddPost from "./components/AddPost"

export default function App() {
  const [page, setPage] = useState("login")
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white h-[90vh] rounded-2xl shadow-2xl overflow-hidden">

        {!user && page === "login" && (
          <Login
            login={(u) => {
              setUser(u)
              setPage("home")
            }}
            guest={() => {
              setUser({ name: "Guest" })
              setPage("home")
            }}
            goRegister={() => setPage("register")}
          />
        )}

       
        {!user && page === "register" && (
          <Register goLogin={() => setPage("login")} />
        )}

        
        {user && page === "home" && (
          <Home add={() => setPage("add")} posts={posts} />
        )}

       
        {user && page === "add" && (
          <AddPost
            back={() => setPage("home")}
            addPost={(data) => setPosts([...posts, data])}
          />
        )}

      </div>
    </div>
  )
}