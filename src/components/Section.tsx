import { useContext } from "react"
import bg_family from "../images/bg_family.png"
import { Toast } from "../utils/Toast"
import { FoodContext } from "../context/FoodContext"

export const Section = () => {

  const { confirmOrderToast } = useContext(FoodContext)
  return (
    <section className="w-[80%] max-md:w-[95%] h-[75vh] max-md:h-[58vh] flex items-center 
      max-md:flex-col justify-between overflow-hidden bg-orange-500 rounded-2xl px-20 pb-4 max-md:px-5">
      {confirmOrderToast && (<Toast text="Detalhes do pedido enviado!"/>)}
      <img src={bg_family} alt="" className="w-[550px]" />
      <div>
        <h2 className="text-4xl max-md:text-2xl text-white text-opacity-70 hover:text-opacity-100 max-md:text-center">
          Experimente o melhor que podemos oferecer!
        </h2>
      </div>
    </section>
  )
}
