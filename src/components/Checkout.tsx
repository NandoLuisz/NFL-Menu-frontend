import { useContext, useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { FoodContext } from "../context/FoodContext";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../utils/PageTransition ";
import { z } from "zod";
import { Toast } from "../utils/Toast";

interface ClientFormProps {
    firstname: string;
    secondname: string;
    email: string;
    street: string;
    city: string;
    cep: string;
    contact: string;
    number: string;
}

const clientFormSchema = z.object({
    firstname: z.string().min(3).max(15),
    secondname: z.string().min(3).max(15),
    email: z.string().email("email inválido"),
    street: z.string().min(3),
    city: z.string().min(3),
    cep: z.string().min(9).max(9),
    contact: z.string().min(8),
    number: z.string().min(1),
});

export const Checkout = () => {

    const context = useContext(FoodContext);

    if (!context) {
        return 
    }

    const [clientRequest, setClientRequest] = useState<ClientFormProps>({
        firstname: "",
        secondname: "",
        email: "",
        street: "",
        city: "",
        cep: "",
        contact: "",
        number: "",
    });
    const [toastWarningFormClient, setToastWarningFormClient] = useState<boolean>(false)
    const { subtotal, setClientContext } = context

    const deliveryFee = 2;
    const navigate = useNavigate();

    useEffect(() => {
        const storedClient = localStorage.getItem("clientContext");
        if (storedClient) {
            try {
                const parsedClient = JSON.parse(storedClient);
                setClientRequest(parsedClient); // Atualiza o formulário com os dados do localStorage
            } catch (error) {
                console.error("Erro ao carregar clientContext do localStorage:", error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitClient = (e: React.FormEvent) => {
        e.preventDefault();
        const result = clientFormSchema.safeParse(clientRequest);
        if (result.success) {
            setClientContext({ ...clientRequest });
            localStorage.setItem("clientContext", JSON.stringify(clientRequest)); // Salva os dados no localStorage
            navigate("/payment");
        } else {
            setToastWarningFormClient(true)
        }
    };

    useEffect(() => {
        if(toastWarningFormClient){
          const timer = setTimeout(() => {
            setToastWarningFormClient(false)
          }, 5000)
    
          return () => clearTimeout(timer)
        }
       }, [toastWarningFormClient])

    return (
        <PageTransition>
            <div className="w-full min-h-screen flex items-center flex-col pt-5">
                {toastWarningFormClient && (<Toast text="Preencha corretamente o formulário!" color="yellow"/>)}
                <NavBar />
                <form
                    className="w-[80%] max-md:w-[95%] flex-1 flex max-md:flex-col items-start 
                                justify-between px-10 max-md:px-2 py-10 max-md:gap-10"
                    onSubmit={handleSubmitClient}
                >
                    <div className="w-[40%] max-md:w-full flex flex-col gap-10 max-md:gap-3">
                        <h3 className="text-2xl max-md:text-xl font-semibold">Informações para entrega</h3>
                        <div className="w-full flex flex-col gap-4">
                            <div className="w-full flex justify-between gap-4">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Primeiro Nome"
                                    className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                    value={clientRequest.firstname}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Segundo Nome"
                                    name="secondname"
                                    className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                    value={clientRequest.secondname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                value={clientRequest.email}
                                onChange={handleInputChange}
                            />
                            <div className="w-full flex justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="Rua"
                                    name="street"
                                    className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                    value={clientRequest.street}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Número"
                                    name="number"
                                    className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                    value={clientRequest.number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Cidade"
                                name="city"
                                className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                value={clientRequest.city}
                                onChange={handleInputChange}
                            />
                            <div className="w-full flex justify-between gap-2">
                                <input
                                    type="text"
                                    placeholder="CEP"
                                    name="cep"
                                    className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                    value={clientRequest.cep}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Contato(dd)"
                                name="contact"
                                className="outline-none border-2 border-zinc-300 rounded-md px-2 py-2 w-full"
                                value={clientRequest.contact}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="w-[40%] h-[200px] max-md:w-full  flex flex-col justify-between">
                        <h3 className="font-bold text-xl max-md:text-xl text-zinc-900">Total do Carrinho</h3>
                        <div className="border-b-[1px] border-zinc-300 flex justify-between">
                            <span>Subtotal</span>
                            <span>R${subtotal}</span>
                        </div>
                        <div className="border-b-[1px] border-zinc-300 flex justify-between">
                            <span>Taxa de entrega</span>
                            <span>R${deliveryFee}</span>
                        </div>
                        <div className="flex justify-between text-zinc-800 font-medium">
                            <span>Total do pedido</span>
                            <span>R${subtotal + deliveryFee}</span>
                        </div>
                        <button
                            type="submit"
                            className="w-[50%] max-md:w-full bg-orange-700 hover:bg-orange-400 px-1 py-2 
                                            text-white  hover:text-opacity-70 rounded-lg max-md:-mb-8"
                        >
                            Submeter Pedido
                        </button>
                    </div>
                </form>
            </div>
        </PageTransition>
    );
};
