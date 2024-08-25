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
    

const router = createMemoryRouter(newRouter, {initialEntries: ["/shop"]})

const mockMenClothingData = [
    { id: 1, title: "Item 1", price: 10, image: "image1.jpg" },
    { id: 2, title: "Item 2", price: 20, image: "image2.jpg" },
];
  
const mockElectronicsData = [
    { id: 6, title: "Item 6", price: 60, image: "image6.jpg" },
    { id: 7, title: "Item 7", price: 70, image: "image7.jpg" },
];

global.fetch = vi.fn((url) => {
    if (url.includes("men's clothing")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMenClothingData),
      });
    } else if (url.includes("electronics")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockElectronicsData),
      });
    }
});




describe("Men component tests", async () => {
    afterEach(() => {
        cleanup(); 
    });

    it("shows array of mens clothing", async () => {
        render(
            <RouterProvider router={router}></RouterProvider>,
        );

        for (const item of mockMenClothingData) {
            expect(await screen.findByText(item.title)).toBeInTheDocument();
        }
    })

    it("shows array of electronics", async () => {
        render(
            <RouterProvider router={router}></RouterProvider>,
        );

        for (const item of mockElectronicsData) {
            expect(await screen.findByText(item.title)).toBeInTheDocument();
        }
    })

    it("increments input value by 1 when + clicked", async () => {
        render(
            <RouterProvider router={router}></RouterProvider>,
        );

        const user = userEvent.setup();
        const plus = screen.getAllByText("+")[0];
        const inputBox = screen.getAllByTestId("inputbox")[0];

        await user.click(plus);
        expect(inputBox.value).toBe("1");
    })

    it("decrements input value by 1 when - clicked", async () => {
        render(
            <RouterProvider router={router}></RouterProvider>,
        );

        const user = userEvent.setup();
        const plus = screen.getAllByText("+")[0];
        const minus = screen.getAllByText("-")[0];
        const inputBox = screen.getAllByTestId("inputbox")[0];

        await user.click(plus);
        await user.click(plus);
        await user.click(minus);
        expect(inputBox.value).toBe("1");
    })

})

