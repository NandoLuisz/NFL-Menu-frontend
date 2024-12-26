import { useContext, useState } from "react";
import { FoodList } from "./FoodList";

import data from "../data.json"

import { FoodContext } from "../context/FoodContext";

const drinks = ["Sucos", "Refrigerantes", "Vitaminas"]

interface FoodResponse{
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    type: string;
    amount: number;
}

export const FoodOne = () => {

    const context = useContext(FoodContext);

    if (!context) {
        return 
    }
 
    const { foodsContext, increment, decrement } = context
    const [filteredFood, setFilteredFood] = useState<FoodResponse[]>([])
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [filtered, setFiltered] = useState(false)
  
    const filterFood = (type: string) => {
        let filtered = []
        filtered = foodsContext.filter((food: any) => food.type === type)
        setFilteredFood(filtered)
    }
   
return (
    <section id="menu" className='w-full flex items-center flex-col py-3 gap-4 text-zinc-700'>
         <div className='w-[80%] max-md:w-[95%] h-[50vh] flex flex-col items-center justify-between text-zinc-600'>
            <div className="w-full flex items-start max-md:items-center flex-col text-center">
                <h2 className="text-[27px] max-md:text-xl">Explore nosso menu</h2>
                <p className="text-lg max-md:text-base opacity-70">Selecione um das comidas para adicionar ao seu carrinho</p>
            </div>
            <div className="w-full h-[250px] flex flex-col gap-10">
                <div className="w-full flex items-center py-1 ">
                    <div className="w-full h-[160px] px-2 flex items-center justify-between gap-4 overflow-x-auto scroll-smooth">
                    {data.map((item) => (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
                        key={item.name}
                        className="flex flex-col items-center gap-2"
                        onClick={() => {
                            if (selectedItem === item.name) {
                              setSelectedItem(null)
                              setFiltered(false)
                            } else {
                              setSelectedItem(item.name)
                              filterFood(item.type)
                              setFiltered(true)
                            }
                          }}
                        >
                        <div className="w-28 h-28 max-md:w-20 max-md:h-20 relative"> 
                            <img
                            src={item.image}
                            alt={item.name}
                            className={`w-full h-full object-cover rounded-full shadow-lg cursor-pointer hover:white hover:opacity-80
                                ${selectedItem === item.name ? 'outline outline-4 outline-orange-500 bg-white opacity-60' : ""}`}
                            />
                        </div>
                        <span className="max-md:text-xs">{item.name}</span>
                        </div>
                    ))}
                    </div>
                </div>
                <ul className="flex gap-12 justify-center max-md:gap-3 max-md:-mt-5 px-4">
                    {drinks.map((item, index) => (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div key={drinks[index]} onClick={() => {
                            if(selectedItem === item){
                                setSelectedItem(null)
                                setFiltered(false)
                            }else{
                                setSelectedItem(item)
                                setFiltered(true)
                                filterFood(item)
                            }
                        }}>
                            <li
                            className={`px-2 py-1 w-[150px] max-md:w-[100px] flex justify-center cursor-pointer rounded-full text-white 
                            shadow-lg text-opacity-80 max-md:text-xs ${selectedItem === item ? "bg-orange-300" : "bg-orange-500"}`}
                            >
                            {item}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="w-full h-[1px] bg-zinc-400">
            </div>
        </div>
        <div className='w-[80%] flex items-center flex-col py-3 gap-4 text-zinc-700'>
            <div className="w-full">
                <h2 className="text-[27px] max-md:text-center">Nosso Menu</h2>
            </div>
            {filtered ? (
                <div className="w-full grid grid-cols-4 max-md:justify-items-center max-md:grid-cols-1 gap-16 max-md:gap-4">
                    {filteredFood.map((item) => (
                        <div key={item.id}>
                        <FoodList 
                        title={item.title} 
                        image={item.image} 
                        description={item.description} 
                        price={item.price}
                        amount={item.amount}
                        increment={() => increment(item.id)}
                        decrement={() => decrement(item.id)}
                        />
                        </div>
                    ))}
                </div>
            ): (
                <div className="w-full grid grid-cols-4 max-md:justify-items-center max-md:grid-cols-1 gap-16 max-md:gap-4">
                    {foodsContext.map((item) => (
                        <div key={item.id}>
                        <FoodList 
                        title={item.title} 
                        image={item.image} 
                        description={item.description} 
                        price={item.price}
                        amount={item.amount}
                        increment={() => increment(item.id)}
                        decrement={() => decrement(item.id)}
                        />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section>
)
}
