import { createContext, useState, ReactNode, useEffect } from "react";
import { foodFetch } from "../axios/config";

interface FoodResponse {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    type: string;
    amount: number;
}

interface ClientContext{
    firstname: string
    secondname: string
    email: string
    street: string
    city: string
    cep: string
    contact: string
    number: string
}

interface FoodContextType {
    foodsContext: FoodResponse[]
    clientContext: ClientContext
    confirmOrderToast: boolean
    setClientContext: React.Dispatch<React.SetStateAction<ClientContext>>
    setConfirmOrderToast: React.Dispatch<React.SetStateAction<boolean>>
    increment: (id: number) => void
    decrement: (id: number) => void
    removeItem: (id: number) => void
    updateFoodsContext: (updatedFoods: FoodResponse[]) => void
    totalItems: number
    subtotal: number
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [foodsContext, setFoodsContext] = useState<FoodResponse[]>(() => {
        try {
            const storedFoods = localStorage.getItem("foodsContext");
            if (storedFoods) {
                return JSON.parse(storedFoods);
            }
            return []; // Se não houver dados no localStorage, inicia com um array vazio
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            return [];
        }
    });

    const [clientContext, setClientContext] = useState<ClientContext>(() => {
        try {
            const storedClient = localStorage.getItem("clientContext");
            return storedClient
                ? JSON.parse(storedClient)
                : {
                      firstname: "",
                      secondname: "",
                      email: "",
                      street: "",
                      city: "",
                      cep: "",
                      contact: "",
                      number: "",
                  };
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            return {
                firstname: "",
                secondname: "",
                email: "",
                street: "",
                city: "",
                cep: "",
                contact: "",
                number: "",
            };
        }
    });

    const [confirmOrderToast, setConfirmOrderToast] = useState<boolean>(false)

    const getFoods = async () => {
        try {
            const response = await foodFetch.get("/foods");
            const storedFoods = JSON.parse(localStorage.getItem("foodsContext") || "[]");
    
            const updatedFoods = response.data.map((food: any) => {
                const existingFood = storedFoods.find((f: any) => f.id === food.id);
                return {
                    ...food,
                    amount: existingFood ? existingFood.amount : 0,
                };
            });
    
            setFoodsContext(updatedFoods); // Atualiza o estado
            localStorage.setItem("foodsContext", JSON.stringify(updatedFoods)); // Atualiza o localStorage
        } catch (error) {
            console.error("Erro ao buscar foods:", error);
        }
    };
    

    const updateFoodsContext = (updatedFoods: FoodResponse[]) => {
        setFoodsContext(updatedFoods);
        localStorage.setItem("foodsContext", JSON.stringify(updatedFoods));
    };

    useEffect(() => {
        getFoods(); // Chama a função para buscar os alimentos do backend
    }, []);

    useEffect(() => {
        // Salva os dados no localStorage sempre que houver uma alteração
        try {
            localStorage.setItem("foodsContext", JSON.stringify(foodsContext));
        } catch (error) {
            console.error("Erro ao salvar foodsContext no localStorage:", error);
        }
    }, [foodsContext]);

    useEffect(() => {
        if(confirmOrderToast){
            const timer = setTimeout(() => {
                setConfirmOrderToast(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [confirmOrderToast])

    const totalItems = foodsContext.reduce((acc, food) => acc + food.amount, 0);

    const subtotal = foodsContext.reduce(
        (acc, food) => acc + food.amount * food.price,
        0
    );

    const increment = (id: number) => {
        setFoodsContext((prevFoods) =>
            prevFoods.map((food) =>
                food.id === id ? { ...food, amount: food.amount + 1 } : food
            )
        );
    };

    const decrement = (id: number) => {
        setFoodsContext((prevFoods) =>
            prevFoods.map((food) =>
                food.id === id && food.amount > 0
                    ? { ...food, amount: food.amount - 1 }
                    : food
            )
        );
    };

    const removeItem = (id: number) => {
        setFoodsContext((prevFoods) =>
            prevFoods.map((food) =>
                food.id === id ? { ...food, amount: 0 } : food
            )
        );
    };

    return (
        <FoodContext.Provider
            value={{
                foodsContext,
                clientContext,
                confirmOrderToast,
                setClientContext,
                setConfirmOrderToast,
                increment,
                decrement,
                removeItem,
                updateFoodsContext,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};
