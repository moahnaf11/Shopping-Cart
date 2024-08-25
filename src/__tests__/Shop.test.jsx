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

const newRouter = createMemoryRouter(
    createRoutesFromElements( 
        <Route path='/shop' element={<Shop />} errorElement={<Error />}>
            <Route index element={<Men />}></Route>
            <Route path=':men' element={<MenItem />}></Route>
            <Route path='women' element={<Women />}></Route>
        </Route>
    ),
    { initialEntries: ['/shop'] }
)

describe("Shop component tests", async () => {
    afterEach(() => {
        cleanup(); 
    });

    it("shows mens page", async () => {
        render(
            <RouterProvider router={newRouter}>
                <Shop />
            </RouterProvider>,
        );

        screen.debug();
        const priceFilter = await screen.findByRole("heading", {name: /price filter/i});
    
        expect(priceFilter).toBeInTheDocument();
    })


})