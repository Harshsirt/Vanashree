import { FaPlus } from "react-icons/fa"
import Card from "./Post"

export default function Home({ add, posts }) {

  return (
    <div className="bg-gray-100 h-full overflow-y-auto">

      <div className="bg-white px-4 py-3 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold text-green-600">
          Vanashree 🌱
        </h1>

        <button onClick={add}>
          <FaPlus />
        </button>
      </div>

      <div className="p-4 space-y-4">

        {posts.map((post, i) => (
          <Card
            key={i}
            name={post.name}
            species={post.species}
            image={post.image}
          />
        ))}

      </div>
    </div>
  )
}