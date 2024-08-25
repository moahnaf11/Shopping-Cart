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

    it("home renders as default in app outlet", async () => {
        render(
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>,
        );

        screen.debug();
        const home = screen.getByText(/Welcome to Quick Cart/i);
        expect(home).toBeInTheDocument();
    })


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

    it("shows shop page when shop clicked", async () => {
        render(
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>,
        );
        const user = userEvent.setup();
        const shop = screen.getByTestId("shop");
        await user.click(shop);
        const menLink = screen.getByRole("link", {name: /Men's Clothing \/ electronics/i});
        expect(menLink).toBeInTheDocument();
    })

    it("shows checkout page when contact clicked", async () => {
        render(
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>,
        );
        const user = userEvent.setup();
        const checkout = screen.getByTestId("checkout");
        await user.click(checkout);
        const checkPage = screen.getByTestId("orderdiv");
        expect(checkPage).toBeInTheDocument();
    })


})