import { useState } from "react";
import foodFetch from "../axios/config";

const FoodForm: React.FC = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const food = { title, image, type, description, price }

        console.log(JSON.stringify(food))

        await foodFetch.post("/foods", JSON.stringify(food))
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] bg-zinc-400 px-4 py-4 flex flex-col justify-center items-center gap-3">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Tipo:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    };

export default FoodForm


