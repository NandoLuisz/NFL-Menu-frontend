import { useContext, useState } from "react"
import { FoodContext } from "../context/FoodContext"
import { NavBar } from "./NavBar"
import { PageTransition } from "../utils/PageTransition "
import { useNavigate } from "react-router-dom"
import { foodFetch } from "../axios/config"

interface ClientFormProps{
    firstname: string
    secondname: string
    email: string
    street: string
    city: string
    cep: string
    contact: string
    number: string
}

export const Payment = () => {

    const { foodsContext, clientContext, setClientContext, updateFoodsContext, setConfirmOrderToast } = useContext(FoodContext)

    const [modalConfirmSure, setModalConfirmSure] = useState(false)

    const navigate = useNavigate()

    const confirmOrder = () => {
        saveOrderDataBase()
        try {
            const emptyClientRequest: ClientFormProps = {
                firstname: '',
                secondname: '',
                email: '',
                street: '',
                city: '',
                cep: '',
                contact: '',
                number: '',
            };
            localStorage.setItem("clientContext", JSON.stringify(emptyClientRequest));
            setClientContext(emptyClientRequest);
    
            const storedFoods = localStorage.getItem("foodsContext");
            if (storedFoods) {
                const foods = JSON.parse(storedFoods);
                const updatedFoods = foods.map((food: { amount: number }) => ({
                    ...food,
                    amount: 0,
                }));
                updateFoodsContext(updatedFoods)
            }
            navigate("/")
        } catch (error) {
            console.error("Erro ao confirmar o pedido:", error);
            alert("Ocorreu um erro ao processar seu pedido. Tente novamente.");
        }
    };

    const saveOrderDataBase = async () => {
        let orderText = "🛒 *Resumo do Pedido*\n\n";
        let totalPrice = 0;
        const emailClient = clientContext.email;
        const addressClient = `${clientContext.street}, Nº ${clientContext.number}, ${clientContext.city}`;
    
        // Itera sobre os itens no pedido
        foodsContext.forEach((item) => {
            if (item.amount > 0) {
                orderText += `➔ ${item.amount}x *${item.title}*\n   ${item.description}\n   🏷️ Preço unitário: R$${item.price.toFixed(2)}\n\n`;
                totalPrice += item.price * item.amount;
            }
        });
    
        // Adiciona taxa de entrega e endereço
        const deliveryFee = 2.0; // Taxa de entrega fixa
        const finalPrice = totalPrice + deliveryFee;
        orderText += `🚚 *Taxa de entrega:* R$${deliveryFee.toFixed(2)}\n`;
        orderText += `📍 *Endereço de entrega:*\n   ${addressClient}\n\n`;
        orderText += `💳 *Total a pagar:* R$${finalPrice.toFixed(2)}\n`;
    
        const body = `${orderText}\n\n📞 Caso tenha dúvidas, entre em contato conosco.\n🙏 Obrigado por escolher nosso serviço!`;
    
        const emailSend = {
            to: emailClient,
            subject: "📋 Seu pedido foi confirmado!",
            body
        };
    
        try {
            // Envia o pedido por meio de uma requisição POST
            const response = await foodFetch.post("/email", JSON.stringify(emailSend));
    
            // Verifica se a resposta foi bem-sucedida
            if (response.status === 200) {
                console.log("Pedido enviado com sucesso!");
            } else {
                console.error("Falha ao enviar pedido. Código de status:", response.status);
            }
        } catch (error) {
            console.error("Erro ao enviar o pedido:", error);
        }
    };
    
    return(
        <PageTransition>
            <div className="w-full h-min-screen flex items-center flex-col pt-5">
                {modalConfirmSure && (
                    <div className="fixed w-full min-h-screen -mt-5 bg-black bg-opacity-70 flex items-center justify-center z-10">
                        <div className="w-[450px] h-56 bg-white flex justify-center items-center flex-col gap-10 px-4 rounded-md text-center max-md:w-[90%]">
                            <span className="text-2xl">Tem certeza que deseja fazer o pedido?</span>
                            <div className="w-full flex justify-center gap-6">
                                <button 
                                onClick={() => [confirmOrder(), setModalConfirmSure(false), setConfirmOrderToast(true)]}
                                className="w-28 bg-red-500 px-4 py-1 rounded-md text-white hover:bg-red-600">
                                    confirmar
                                </button>
                                <button 
                                onClick={() => setModalConfirmSure(false)}
                                className="w-28 bg-zinc-500 px-4 py-1 rounded-md text-white hover:bg-zinc-600">
                                    cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <NavBar />
                <div className="w-[80%] max-md:w-[95%] min-h-[75vh] flex max-md:flex-col items-start justify-between md:px-10 md:pt-10 gap-5 pb-5">
                    <div className="w-full h-[100%] px-5 py-5 rounded-xl">
                        <h2 className="text-2xl text-zinc-700 hover:text-opacity-100 mb-2">Seu pedido</h2>
                        <div className="w-full h-full flex flex-col gap-3">
                            {foodsContext.map((item) => (
                                item.amount > 0 ? (
                                <div key={item.id} className="flex w-full h-[100px] gap-3 shadow-patternShadow rounded-sm">
                                    <img src={item.image} alt={item.title} className="w-[100px] h-[100px] rounded"/>
                                    <div className="w-full h-full flex flex-col max-md:text-sm">
                                        <span className="text-zinc-900 font-bold">{item.title}</span>
                                        <span className="text-zinc-700">{item.description}</span>
                                        <span className="text-zinc-700">R${item.price}</span>
                                        <span className="text-zinc-700">{item.amount} unidade</span>
                                    </div>
                                </div>
                                ) : (
                                    null
                                )
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[100%] px-5 py-5 rounded-xl">
                        <h2 className="text-2xl text-zinc-700 hover:text-opacity-100">Seus dados</h2>
                        <div className="w-full flex flex-col gap-1 text-zinc-700">
                            <span className="font-bold text-zinc-900">{clientContext.firstname} {clientContext.secondname}</span>
                            <span>{clientContext.email}</span>
                            <span>{clientContext.street} {clientContext.number}</span>
                            <span>{clientContext.city}</span>
                            <span>{clientContext.cep}</span>
                            <span>{clientContext.contact}</span>
                        </div>
                        <button onClick={() => setModalConfirmSure(true)} className="w-[50%] max-md:w-full
                                         bg-orange-700 hover:bg-orange-400 px-1 py-2 
                                           rounded-lg text-white mt-3">
                                            Confirmar pedido
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}