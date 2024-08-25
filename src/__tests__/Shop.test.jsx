import { vi, describe, it, expect } from 'vitest'
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Shop } from '../components/Shop';
import { Men } from '../components/Men';
import { MenItem } from '../components/MenItem';
import { Women } from '../components/Women';
import { Error } from '../components/Error';
import App from '../App';
import { Contact } from '../components/Contact';
import { Checkout } from '../components/Checkout';
import { Home } from '../components/Home';


const newRouter = [
    {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: 'shop', element: <Shop />, errorElement: <Error />, children: [
            {index: true, element: <Men />},
            {path: ":men", element: <MenItem />},
            {path: "women", element: <Women />}
          ] },
          { path: 'contact', element: <Contact /> },
          { path: 'checkout', element: <Checkout /> },
        ],
    },

]
    

const router = createMemoryRouter(newRouter, {initialEntries: ["/shop"]})


describe("Shop component tests", async () => {
    afterEach(() => {
        cleanup(); 
    });

    it("shows mens page as default", async () => {
        render(
            <RouterProvider router={router}>
                <Shop />
            </RouterProvider>,
        );

        screen.debug();
        const priceFilter = await screen.findByRole("heading", {name: /price filter/i});
    
        expect(priceFilter).toBeInTheDocument();
    })

    it("shows women when clicked", async () => {
        render(
            <RouterProvider router={router}>
                <Shop />
            </RouterProvider>,
        );

        const user = userEvent.setup();
        const womenLink = screen.getByRole("link", {name: /Women's Clothing \/ jewelry/i});
        await user.click(womenLink);
        expect(screen.getByTestId("womendiv")).toBeInTheDocument();
    }) 

    it("shows mens page when clicked", async () => {
        render(
            <RouterProvider router={router}>
                <Shop />
            </RouterProvider>,
        );

        const menLink = screen.getByRole("link", {name: /Men's Clothing \/ electronics/i});
        const priceFilter = await screen.findByRole("heading", {name: /price filter/i});
    
        expect(priceFilter).toBeInTheDocument();
    }) 



})