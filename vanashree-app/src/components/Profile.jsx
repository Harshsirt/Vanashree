import { FaArrowLeft } from "react-icons/fa"

export default function Profile({ user, back }) {

  return (
    <div className="p-4">

      <button onClick={back}>
        <FaArrowLeft />
      </button>

      <h2>{user.name}</h2>
      <p>{user.email}</p>

    </div>
  )
}