import { Form, useActionData, Link, useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react";
import card from "../card.svg"

export function Checkout() {
    const [cart, setCart] = useOutletContext();
    console.log(cart);
    const [formdata, setFormdata] = useState({
        cardnumber: "",
        cv: "",
        name: "",
        expirydate: "",
        email: "",
    });
    const checkoutdata = useActionData();

    function handleChange(e) {
        let {name, value} = e.target;

        if (name === "cardnumber") {
            value = value
            .replace(/[^\d]/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .trim();
        }   else if (name === "cv") {
            value = value
            .replace(/[^\d]/g, '')
            .trim();
        }   else if (name === "expirydate") {
            value = value
            .replace(/[^\d]/g, '')
            .trim();
            if (value.length > 2) {
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
            }
        }


        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // reset form
    function handleReset () {
        setFormdata({
            cardnumber: "",
            cv: "",
            name: "",
            expirydate: "",
            email: "",
        })
    }

    // delete cart item
    function handleCart(e, key) {
        setCart(prev => {
            const newCart = prev.filter(item => item.id !== key);
            console.log("new", newCart);
            return newCart;
        })
    }

    // total checkout price
    function total () {
        return cart.reduce((total, item) => {
            return total + (item.quantity * item.price);

        }, 0)
    }

    useEffect(() => {
        if (checkoutdata) {
            setFormdata({
                cardnumber: "",
                cv: "",
                name: "",
                expirydate: "",
                email: "",
            });

            setCart([]);
        }
    }, [checkoutdata]);



    return (
        <div className="checkingout">

            <section>
                <div className="order">
                    {cart.length > 0 ? <h1>Your orders</h1> : <h1>No orders yet</h1>}
                    <div className="items">
                        {cart.length > 0 && cart.map(item => {
                            return <div className="orderitems" key={item.id}>
                                <img src={item.image} alt="item image" />
                                <div className="title">{item.title}</div>
                                <div className="information">
                                    <div className="quant">QTY: {item.quantity}</div>
                                    <div className="total">${item.quantity * item.price}</div>
                                    <button onClick={(e) => handleCart(e, item.id)}>x</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                {cart.length > 0 && <div className="totalprice">Checkout Total: ${total().toFixed(2)}</div>}
            </section>

            {cart.length > 0 && <section>
                <h1>Checkout</h1>
                <Form method="post" action="/checkout" onReset={handleReset}>
                    <div className="cardicon">
                        <h1>credit card</h1>
                        <img src={card} alt="credit card icon" />
                    </div>
                    <div className="row1">
                        <div className="card-number">
                            <label htmlFor="cardnumber">Card Number <span>*</span></label>
                            <input value={formdata.cardnumber} onChange={handleChange} type="text" id="cardnumber" name="cardnumber" placeholder="0000 0000 0000 0000" maxLength="19" pattern="^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$" required/>
                        </div>
                        <div className="cvv">
                            <label htmlFor="cv">CVV <span>*</span></label>
                            <input value={formdata.cv} onChange={handleChange} type="text" id="cv" name="cv" placeholder="123" pattern="^[0-9]{3}$" maxLength="3" required/>
                        </div>
                    </div>

                    <div className="name">
                        <label htmlFor="name">Name <span>*</span></label>
                        <input value={formdata.name} onChange={handleChange} type="text" id="name" name="name" placeholder="Ahnaf" required/>
                    </div>

                    <div className="expirydate">
                        <label htmlFor="date">Expiry Date <span>*</span></label>
                        <input value={formdata.expirydate} maxLength="5" onChange={handleChange} type="text" id="expirydate" name="expirydate" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/\d{2}$" required/>
                    </div>

                    <div className="email">
                        <label htmlFor="email">Email <span>*</span></label>
                        <input value={formdata.email} onChange={handleChange} type="email" id="email" name="email" placeholder="ahnaf@top.com" required/>
                    </div>

                    <div className="button-container">
                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </div>

                </Form>

            </section>}

            {checkoutdata && checkoutdata.name && checkoutdata.email && <div className="thankyou">
                Thank you {checkoutdata.name} for shopping with quick cart! You will receive a confirmation email of your purchase at {checkoutdata.email} Meanwhile click <Link to="/">Home</Link> to redirect back to the home page.
            </div> }


        </div>
    )

}

export async function checkoutSubmit({request}) {
    const checkoutdata = await request.formData();
    const submission = {
        name: checkoutdata.get("name"),
        email: checkoutdata.get("email"),
    }

    return {name: submission.name, email: submission.email}

}