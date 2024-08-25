import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App.jsx';
import { Home } from '../components/Home.jsx';
import { Checkout } from '../components/Checkout.jsx';
import { Shop } from '../components/Shop.jsx';
import { Contact } from '../components/Contact.jsx';



const routes = createMemoryRouter([
    {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: 'shop', element: <Shop /> },
          { path: 'contact', element: <Contact /> },
          { path: 'checkout', element: <Checkout /> },
        ],
      },
    
]);
describe("App component tests", () => {
    it("shows navLinks", async () => {
        render(
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>,
        );

        const checkout = screen.getByTestId("checkout");
        const home = screen.getByTestId("home");
        const shop = screen.getByTestId("shop");
        const contact = screen.getByTestId("contact");

        expect(checkout).toBeInTheDocument();
        expect(home).toBeInTheDocument();
        expect(shop).toBeInTheDocument();
        expect(contact).toBeInTheDocument();

    });


    it("shows contact page when contact clicked", async () => {
        render(
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>,
        );
        const user = userEvent.setup();
        const contact = screen.getByTestId("contact");
        await user.click(contact);
        const message = screen.getByRole("heading", {name: /Leave us a message/i});
        expect(message).toBeInTheDocument();
    })
})