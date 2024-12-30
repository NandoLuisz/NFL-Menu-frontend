import axios from "axios"

export const foodFetch = axios.create({
    baseURL: "https://app-food-rv1n.onrender.com/",
    headers: {
        'Content-Type': 'application/json', 
      },
})
