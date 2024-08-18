import { Link } from "react-router-dom"

export function Error() {
    return (
        <div className="errorpage">
            <h1>Sorry Page not Found</h1>
            <p>Go back to Home Page! by clicking <Link to="/">Home</Link></p>
        </div>
    )
}