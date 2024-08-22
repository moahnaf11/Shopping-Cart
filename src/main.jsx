import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Home } from './components/Home.jsx'
import { Error } from './components/Error.jsx'
import { Contact, contactAction } from './components/Contact.jsx'
import { Shop } from './components/Shop.jsx'
import { Men } from './components/Men.jsx'
import { Women } from './components/Women.jsx'
import { MenItem } from './components/MenItem.jsx'
import { Checkout, checkoutSubmit } from './components/Checkout.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />}></Route> 
      <Route path='shop' element={<Shop />} errorElement={<Error />}>
        <Route index element={<Men />}></Route>
        <Route path=':men' element={<MenItem />}></Route>
        <Route path='women' element={<Women />}></Route>

      </Route>
      <Route path='contact' element={<Contact />} action={contactAction}></Route>
      <Route path='checkout' element={<Checkout />} action={checkoutSubmit}></Route>

      <Route path='*' element={<Error />}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
