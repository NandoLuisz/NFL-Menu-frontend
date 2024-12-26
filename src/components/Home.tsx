import { useContext } from "react"
import { FoodOne } from "./FoodOne"
import { Footer } from "./Footer"
import { NavBar } from "./NavBar"
import { Section } from "./Section"
import { FoodContext } from "../context/FoodContext"
import { ModalRegister } from "./ModalRegister"

import { PageTransition } from "../utils/PageTransition "

export const Home = () => {


    return (
        <PageTransition>
            <div className="w-full min-h-[180vh] flex justify-center flex-col items-center 
                            pt-5 gap-5 overflow-hidden relative">
                <NavBar />
                <Section />
                <FoodOne />
                <Footer />
            </div>
        </PageTransition>
    )
}