import { input } from "@testing-library/user-event/dist/cjs/event/input.js";
import { useEffect, useState } from "react"

export function Men() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [quantity, setQuantity] = useState([]);

    // quantity button handlers
    function handleQuantity(e, id, action="") {
        setQuantity((prev) => {
            return prev.map(item => {
                if (item.id === id) {
                    let newQuantity;
    
                    if (action === "plus") {
                        newQuantity = item.quantity + 1;
                    } else if (action === "sub") {
                        newQuantity = Math.max(item.quantity - 1, 0); // Prevent going below 0
                    } else {
                        newQuantity = Number(e.target.value, 10) || 0; // Convert to integer or default to 0
                    }
                    console.log({...item, quantity: newQuantity });
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })


        })

    }

    // filter items by search
    function handleSearch(e) {
        if (e.target.value) {
            setData(prev => (
                prev.filter((item) => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()))

            ))

        }   else {
            setData(fullData);
        }


    }


    useEffect(() => {
        async function fetchMen() {
            let clothing, electronics;
            const response = await fetch("https://fakestoreapi.com/products/category/men's clothing", {
                mode: "cors",
                method: "get"
            });
            if (response.ok) {
                clothing = await response.json();
            }

            const response2 = await fetch("https://fakestoreapi.com/products/category/electronics", {
                mode: "cors",
                method: "get"
            });
            if (response2.ok) {
                electronics = await response2.json();
            }

            const alldata = [...clothing, ...electronics];
            const idQuantity = alldata.map(item => (
                {
                    id: item.id,
                    quantity: 0, 
                }
            ))
            console.log(alldata);
            console.log(idQuantity);

            setData([...clothing, ...electronics]);
            setFullData([...clothing, ...electronics]);
            setQuantity(idQuantity);
            
            setLoading(false)

        }
           
        fetchMen();


    }, [])

    return (
        <>
            {loading && <div className="loader">Loading...</div>}
            <input onChange={(e) => handleSearch(e)}></input>

            {data.length > 0 && <div className="menitem">
                {data.length > 0 &&
                    data.map((item) => (
                        <div className="itemcards" key={item.id}>
                            <div className="title">{item.title}</div>
                            <div className="img">
                                <img src={item.image} alt="item image" />
                            </div>
                            <div className="price">${item.price}</div>
                            <div><button>View</button></div>
                            <div className="quantity">
                                <button className="add" onClick={(e) => handleQuantity(e, item.id, "plus")}>+</button>
                                <form id="myform" action="" method="post"><input value={(e) => null} onChange={(e) => handleQuantity(e, item.id)} type="text" pattern="^(0|[1-9][0-9]*)$" /></form>
                                <button className="sub"onClick={(e) => handleQuantity(e, item.id, "minus")}>-</button>
                            </div>
                            <button type="submit" form="myform">Add to cart</button>
                        </div>
                ))}


            </div>}

        </>
    )
}