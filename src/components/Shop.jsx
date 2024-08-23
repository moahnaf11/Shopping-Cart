import { NavLink, Outlet, useOutletContext } from "react-router-dom"

export function Shop() {
    const [cart, setCart] = useOutletContext();
    return (
        <>
            <div className="shop">
                <nav>
                    <ul>
                        <li><NavLink to="" end>Men's Clothing / electronics</NavLink></li>
                        <li><NavLink to="women">Women's Clothing / jewelry</NavLink></li>
                    </ul>
                </nav>

                <main>
                    <Outlet context={[cart, setCart]}></Outlet>
                </main>
            </div>
        </>
    )
}