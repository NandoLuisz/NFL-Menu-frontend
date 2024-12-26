import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { FoodContext } from "../context/FoodContext";
import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../utils/PageTransition ";
import { Toast } from "../utils/Toast";

export const Cart = () => {
  const { foodsContext, removeItem, totalItems, subtotal } = useContext(FoodContext);
  
  const [toastWarningCartEmpty, setToastWarningCartEmpty] = useState<boolean>(false)

  const deliveryFee = 2
  const navigate = useNavigate()

  const handleNavigate = () => {
    if(subtotal > 0){
      navigate("/checkout")
    }else{
      setToastWarningCartEmpty(true)
    }
  }

  useEffect(() => {
    if(toastWarningCartEmpty){
      const timer = setTimeout(() => {
        setToastWarningCartEmpty(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
   }, [toastWarningCartEmpty])

  return (
    <PageTransition>
    <div className="w-full min-h-[100vh] flex items-center pt-5 flex-col gap-5">
      {toastWarningCartEmpty && (<Toast text="Seu carrinho está vázio!" color="yellow"/>)}
      <NavBar />
      <div className="w-[80%] max-md:w-[95%] bg-orange-700 rounded-lg md:px-10 max-md:px-3 py-10">
        <div className="max-md:hidden grid grid-cols-6 gap-4 font-bold text-white text-opacity-70 border-b-[1px] pb-3">
          <span>Itens</span>
          <span>Título</span>
          <span>Preço</span>
          <span>Quantidade</span>
          <span>Total</span>
          <span>Remover</span>
        </div>
        <div className="md:hidden grid grid-cols-3 gap-4 font-bold text-white text-opacity-70 border-b-[1px] pb-3">
          <span>Itens</span>
          <span>Detalhes</span>
          <span>Remover</span>
        </div>
       {totalItems > 0 ? (
         <div className="max-md:w-full">
           {foodsContext
          .filter((item: any) => item.amount > 0)
          .map((item: any) => (
            <div
                key={item.id}
                className="grid grid-cols-6 md:gap-4 max-md:grid-cols-3 items-center text-white text-opacity-70 md:py-3 border-b-[1px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[60px] h-[60px] max-md:w-[80px] max-md:h-[80px] rounded"
              />
              <span className="max-md:hidden">{item.title}</span>
              <span className="max-md:hidden">R${item.price.toFixed(2)}</span>
              <span className="w-[70px] flex justify-center max-md:hidden">{item.amount}x</span>
              <span className="max-md:hidden">R${(item.price * item.amount).toFixed(2)}</span>
              <div className="md:hidden flex flex-col text-sm">
                <span>{item.title}</span>
                <span>R${item.price.toFixed(2)}</span>
                <span className="w-[70px] flex justify-start">{item.amount}x</span>
                <span>R${(item.price * item.amount).toFixed(2)}</span>
              </div>
              <button onClick={() => removeItem(item.id)} className="w-[70px] flex justify-center">
                <X className="cursor-pointer text-black"/>
              </button>
            </div>
          ))}
         </div>
       ) : (
        <div className="h-[120px] w-full flex items-center flex-col justify-center text-white text-opacity-70 text-2xl">
          <ShoppingCart className="size-10"/>
        </div>
       )}
      </div>
      <div className="w-[80%] max-md:w-[95%] p-10 max-md:p-3 flex max-md:flex-col-reverse max-md:gap-5 justify-between text-zinc-600">
        <div className="w-[40%] max-md:w-full h-[200px] flex flex-col justify-between">
          <h3 className="font-bold text-xl text-zinc-900">Total do Carrinho</h3>
          <div className="border-b-[1px] border-zinc-300 flex justify-between">
            <span>Subtotal</span>
            <span>R${subtotal}</span>
          </div>
          <div className="border-b-[1px] border-zinc-300 flex justify-between">
            <span>Taxa de entrega</span>
            <span>R${deliveryFee}</span>
          </div>
          <div className="flex max-md:w-full justify-between text-zinc-800 font-medium">
            <span>Total do pedido</span>
            <span>R${subtotal + deliveryFee}</span>
          </div>
          <button onClick={() => handleNavigate()} className="w-full bg-orange-700 hover:bg-orange-400 px-1 py-2 
                            text-white  hover:text-opacity-70 rounded-lg">
                              Pagamento
          </button>
        </div>
        <div className="w-[50%] max-md:w-full md:h-[180px] max-md:text-center">
          <span>Se você tem cupom de promoção, insira aqui</span>
          <div className="max-md:w-full max-md:flex mt-2">
            <input type="text" placeholder="cupom de promoção" className="w-[70%] bg-zinc-300 outline-none rounded-l-sm py-2 px-2"/>
            <button className="bg-black text-white py-2 px-2 rounded-r-sm">Submeter</button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};
