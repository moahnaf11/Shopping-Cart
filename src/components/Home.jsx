import bag from "../bag.svg"

export function Home() {
    return (
        <>
            <div className="home">
                <h1>Welcome to Quick Cart</h1>
                <img src={bag} alt="shopping bag icon for shoppping" />
                <p>This is where the world comes to shop! Your one-stop destination for a seamless online shopping experience. At Quick Cart, we offer a curated selection of the latest products across various categories, including electronics, fashion, home essentials, and more.</p>

                <h1>Why Choose Quick Cart</h1>
                <ul>
                    <li><strong>Fast and Convenient Shopping:</strong> Our user-friendly interface and streamlined checkout process ensure that you can find what you need and complete your purchase in just a few clicks.</li>
                    <li><strong>Wide Range of Products:</strong> Discover a diverse range of high-quality products from trusted brands, all at competitive prices.</li>
                    <li><strong>Exclusive Deals and Discounts:</strong> Enjoy special offers, seasonal discounts, and exclusive deals that make shopping with us even more rewarding.</li>
                    <li><strong>Secure and Reliable:</strong> Your privacy and security are our top priorities. Shop with confidence knowing that your personal information and transactions are protected by the latest security measures.</li>
                    <div>Start Shopping Now! Explore our extensive collection and find exactly what you need with Quick Cart’s fast and reliable online shopping service.</div>
                </ul>

            </div>
        </>
    )
}