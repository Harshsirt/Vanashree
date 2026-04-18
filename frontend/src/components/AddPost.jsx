import { useState } from "react"

export default function AddPost({ back, addPost }) {

  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [image, setImage] = useState(null)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleAdd = () => {
    addPost({ name, species, image })
    back()
  }

  return (
    <div className="p-4 space-y-3">

      <button onClick={back}>Back</button>

      <input
        placeholder="Tree Name"
        className="w-full border p-2"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Species"
        className="w-full border p-2"
        onChange={(e) => setSpecies(e.target.value)}
      />

      <input type="file" onChange={handleImage} />

      {image && <img src={image} className="h-32" />}

      <button onClick={handleAdd} className="w-full bg-green-600 text-white py-2">
        Add Post
      </button>

    </div>
  )
}