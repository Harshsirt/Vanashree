import { useState } from "react"
import { FaHeart } from "react-icons/fa"

export default function Card({ name, species, image }) {

  const [like, setLike] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      {image ? (
        <img src={image} className="w-full h-40 object-cover" />
      ) : (
        <div className="h-40 bg-green-100"></div>
      )}

      <div className="p-3 flex justify-between items-center">

        <div>
          <h2>{name}</h2>
          <p className="text-sm text-gray-500">{species}</p>
        </div>

        <button onClick={() => setLike(!like)}>
          <FaHeart className={like ? "text-red-500" : "text-gray-400"} />
        </button>

      </div>

    </div>
  )
}