import { vi, describe, it, expect } from 'vitest'
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
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
    

const router = createMemoryRouter(newRouter, {initialEntries: ["/checkout"]});


const mockSetCart = vi.fn();
const mockCart = [];

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useOutletContext: () => [mockCart, mockSetCart],
        createMemoryRouter: actual.createMemoryRouter,
    };
});

describe("checkout component tests", () => {
    it("renders empty cart message", async () => {
        render(
            <RouterProvider router={router}></RouterProvider>,
        );

        const empty = screen.getByRole("heading", {name:/No orders yet/i});
        expect(empty).toBeInTheDocument();
    })
})