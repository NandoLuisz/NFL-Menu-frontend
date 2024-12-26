import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa"


export const Footer = () => {
  return (
    <footer id="about" className='w-full h-[45vh] max-md:h-[100vh] bg-zinc-600 flex flex-col items-center justify-between px-20 max-md:px-5 gap-10 py-10'>
      <div className="w-full grid grid-cols-[600px_300px_300px] max-md:grid-cols-1 max-md:gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <span className='text-5xl text-orange-500 hover:text-orange-700 font-agdasima cursor-pointer'>NFL´s</span>
          <p className="text-white text-opacity-70 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed fuga aliquam excepturi 
            aut impedit unde blanditiis neque quaerat ut vero, nobis architecto. 
            Pariatur ipsa possimus vitae rerum dolores deleniti recusandae.
          </p>
          <div className="flex gap-8">
            <FaFacebookF  className="w-[35px] h-[35px] px-1 py-1 border-2 rounded-full border-opacity-70 hover:border-opacity-100  text-white text-opacity-70 hover:text-opacity-100 cursor-pointer"/>
            <FaInstagram className="w-[35px] h-[35px] px-1 py-1 border-2 rounded-full border-opacity-70 hover:border-opacity-100  text-white text-opacity-70 hover:text-opacity-100 cursor-pointer"/>
            <FaTelegramPlane className="w-[35px] h-[35px] px-1 py-1 border-2 rounded-full border-opacity-70 hover:border-opacity-100  text-white text-opacity-70 hover:text-opacity-100 cursor-pointer"/>
          </div>
        </div>
        <div className="flex flex-col gap-7 max-md:gap-4">
          <span className="text-white text-2xl max-md:text-xl">Companhia</span>
          <ul className="flex flex-col gap-2">
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">Home</li>
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">Sobre nós</li>
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">Delivery</li>
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">Política de privacidade</li>
          </ul>
        </div>
        <div className="flex flex-col gap-7 max-md:gap-4">
          <span className="text-white text-2xl max-md:text-xl">Entre em contato</span>
          <ul className="flex flex-col gap-2">
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">(85)98888-0000</li>
            <li className="text-white text-opacity-70 hover:text-opacity-100 cursor-pointer text-sm">nfl.delivery@email.com.br</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-white text-opacity-70 text-sm">Copyright 2024 &copy; NFL´s.com - Todos os Direitos Reservados</span>
      </div>
    </footer>
  )
}
