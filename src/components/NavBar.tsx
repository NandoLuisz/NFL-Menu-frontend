import { ShoppingBasket } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FoodContext } from '../context/FoodContext';

export const NavBar = () => {

  const { totalItems } = useContext(FoodContext)
  const [cart, setCart] = useState(false)

  useEffect(() => {
    if(totalItems > 0){
      setCart(true)
    }else{
      setCart(false)
    }
  }, [totalItems])


  return (
    <nav className='w-[80%] max-md:w-[95%] h-[5%] flex items-center justify-between px-20 py-10 
                    max-md:py-5 max-md:px-5 rounded-lg bg-orange-300 text-zinc-600 font-semibold'>
        {cart && (
          <div className='absolute bg-red-800 w-[13px] h-[13px] rounded-full right-[231px] 
                          max-md:right-7 max-md:top-[53px] top-[73px] cursor-pointer'>
          </div>
        )}
        <Link to="/"><h1 className='text-5xl hover:text-zinc-900 font-agdasima cursor-pointer'>NFL´s</h1></Link>
        <ul className='flex gap-6 text-base max-md:hidden'>
            <Link to="/"><li className='hover:text-zinc-900 cursor-pointer'>Home</li></Link>
            <li className='hover:text-zinc-900 cursor-pointer'><a href="#menu">Menu</a></li>
            <li className='hover:text-zinc-900 cursor-pointer'><a href="#about">About Us</a></li>
        </ul>
        <div className='flex items-center gap-4'>
            <Link to="/cart">
              <ShoppingBasket className='hover:text-zinc-900 cursor-pointer'/>
            </Link>
        </div>
    </nav>
  )
}
