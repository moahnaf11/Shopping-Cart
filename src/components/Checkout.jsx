import { Form, useActionData, Link } from "react-router-dom"

export function Checkout() {
    const checkoutdata = useActionData()


    return (
        <div className="checkingout">

            <section>
                <div className="order">
                    <h1>Your orders</h1>
                    <div className="items"></div>
                </div>
            </section>

            <section>
                <h1>Checkout</h1>
                <Form method="post" action="/checkout">
                    <h1>credit card</h1>
                    <div className="row1">
                        <div className="card-number">
                            <label htmlFor="cardnumber">Card Number <span>*</span></label>
                            <input type="text" id="cardnumber" name="cardnumber" placeholder="0000 0000 0000 0000" pattern="^\d{4} \d{4} \d{4} \d{4}$" inputMode="tel" maxLength="19" required/>
                        </div>
                        <div className="cvv">
                            <label htmlFor="cv">CVV <span>*</span></label>
                            <input type="text" id="cv" name="cv" placeholder="123" pattern="^\d{3}$" required/>
                        </div>
                    </div>

                    <div className="name">
                        <label htmlFor="name">Name <span>*</span></label>
                        <input type="text" id="name" name="name" placeholder="Ahnaf" required/>
                    </div>

                    <div className="expirydate">
                        <label htmlFor="date">Expiry Date <span>*</span></label>
                        <input type="text" id="expirydate" name="expirydate" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/\d{2}$" required/>
                    </div>

                    <div className="email">
                        <label htmlFor="email">Email <span>*</span></label>
                        <input type="email" id="email" name="email" placeholder="ahnaf@top.com" required/>
                    </div>

                    <div className="button-container">
                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </div>

                </Form>

            </section>
            {checkoutdata && checkoutdata.name && checkoutdata.email && <div className="thankyou">
                Thank you {checkoutdata.name} for shopping with quick cart! You will receive a confirmation email of ur purchase at {checkoutdata.email}
                Meanwhile click <Link to="/">Home</Link> to redirect back to the home page.
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