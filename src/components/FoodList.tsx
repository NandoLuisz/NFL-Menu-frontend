import { Minus, Plus } from "lucide-react";

interface FoodListProps{
  title: string;
  image: string;
  description: string;
  price: number;
  amount: number
  increment: () => void;
  decrement: () => void;
}

export const FoodList: React.FC<FoodListProps> = ( { title, image, description, price, amount, increment, decrement } ) => {
  return (
    <div className="w-[250px] h-[350px] flex justify-between items-center flex-col overflow-hidden 
                  bg-white rounded-2xl shadow-patternShadow relative">
        <div className="absolute flex bg-white rounded-full px-2 py-1 gap-2 right-0 bottom-32 shadow-patternShadow">
          <div className="cursor-pointer" onClick={decrement}>
            <Minus className="size-5 text-red-600"/>
          </div>
          <span className="font-medium">{amount}</span>
          <div className="cursor-pointer" onClick={increment}>
            <Plus className="size-5 text-green-600"/>
          </div>
        </div>
        <img src={image} alt={title} className="w-full h-3/5"/>
        <div className="flex flex-col w-full px-4 pb-4 gap-1">
          <span className="font-bold">{title}</span>
          <span className="text-sm text-zinc-400">{description}</span>
          <span className="text-xl font-bold text-orange-500">R${price}</span>
        </div>
    </div>
  )
}
