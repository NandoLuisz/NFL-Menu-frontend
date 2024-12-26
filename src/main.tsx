import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { FoodProvider } from './context/FoodContext.tsx'

import { Cart } from './components/Cart.tsx'
import { Home } from './components/Home.tsx'
import { Checkout } from './components/Checkout.tsx'
import { Payment } from './components/Payment.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/payment",
        element: <Payment />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FoodProvider>
      <RouterProvider router={router} />
    </FoodProvider>
  </StrictMode>,
)
