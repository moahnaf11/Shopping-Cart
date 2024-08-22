import { Form, Link, useActionData } from "react-router-dom"

export function Contact() {
    const data = useActionData()

    return (
        <div className="contact">
            <h1>Leave us a message</h1>
            <Form method="post" action="/contact">
                <div>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input type="text" id="name" name="name" placeholder="name" required/>
                </div>

                <div>
                    <label htmlFor="mail">email <span>*</span></label>
                    <input type="email" id="mail" name="mail" placeholder="ahnaf@top.com" required/>
                </div>

                <div className="text">
                    <label htmlFor="description">Messages <span>*</span></label>
                    <textarea name="description" id="description" placeholder="awesome site" required></textarea>
                </div>

                <div className="button-container">
                    <button type="submit">Submit</button>
                </div>

            </Form>

            {data && data.name && <div className="thankyou">Thank You for your message {data.name}! your feed back is valuable to us!</div>}
            {data && data.name && <div className="thankyou">
                Click <Link to="/">Home</Link> to redirect back to the homepage
            </div>}
        </div>
        
    )
}


export const contactAction = async ({request}) => {

    const data = await request.formData();
    const submission = {
        name: data.get("name"),
        email: data.get("mail"),
        message: data.get("description"),
    }

    return {name: submission.name}

}