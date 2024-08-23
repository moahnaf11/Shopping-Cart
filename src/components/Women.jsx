import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import filter from "../filter.svg"

export function Women() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [disableInput, setDisableInput] = useState(false);

    // quantity button handlers
    function handleQuantity(e, id, action="") {
        setQuantity((prev) => {
            const newArray = prev.map(item => {
                if (item.id === id) {
                    let newQuantity;
    
                    if (action === "plus") {
                        newQuantity = item.quantity + 1;
                    } else if (action === "minus") {
                        newQuantity = Math.max(item.quantity - 1, 0); // Prevent going below 0
                    } else {
                        newQuantity = Number(e.target.value, 10) || 0; // Convert to integer or default to 0
                    }
                    console.log({...item, quantity: newQuantity });
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
            console.log(newArray);
            return newArray;
        })

    }

    // filter items by search
    function handleSearch(e) {
        if (e.target.value) {
            setData(prev => (
                fullData.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))

            ))

        }   else {
            setData(fullData);
        }


    }

    // update inputValue of form input field
    function handleValue(id) {
        const inputValue = quantity.find(q => q.id === id);
        return inputValue.quantity;
    }

    // submit handler for add to cart button
    function handleSubmit(e) {
        e.preventDefault();

    }

    // handler for price filter
    function handleFilter(e) {
        const {value} = e.target;
        console.log(value);
        if (value === "none") {
            setData(fullData);
            setDisableInput(false);
        }   else if (value === "low") {
            setData((prev) => {
                let newArray = [...fullData];
                newArray.sort((a, b) => a.price - b.price);
                return newArray;
            })
            setDisableInput(true);
        }   else if (value === "high") {
            setData((prev) => {
                let newArray = [...fullData];
                newArray.sort((a, b) => a.price - b.price).reverse();
                return newArray;
            })
            setDisableInput(true);
        }

    }


    useEffect(() => {
        async function fetchWomen() {
            let women, jewelry;
            const response = await fetch("https://fakestoreapi.com/products/category/women's clothing", {
                mode: "cors",
                method: "get"
            });
            if (response.ok) {
                women = await response.json();
                localStorage.setItem("women", JSON.stringify(women));
            }

            const response2 = await fetch("https://fakestoreapi.com/products/category/jewelery", {
                mode: "cors",
                method: "get"
            });
            if (response2.ok) {
                jewelry = await response2.json();
                localStorage.setItem("jewelry", JSON.stringify(jewelry));
            }

            const alldata = [...women, ...jewelry];
            const idQuantity = alldata.map(item => (
                {
                    id: item.id,
                    quantity: 0, 
                }
            ))
            console.log(alldata);
            console.log(idQuantity);

            setData([...women, ...jewelry]);
            setFullData([...women, ...jewelry]);
            setQuantity(idQuantity);
            
            setLoading(false);

        }
        let women, jewelry;
        if (localStorage.getItem("women") && localStorage.getItem("jewelry")) {
            setLoading(false);
            women = JSON.parse(localStorage.getItem("women"));
            jewelry = JSON.parse(localStorage.getItem("jewelry"));
            const alldata = [...women, ...jewelry];
            const idQuantity = alldata.map(item => (
                {
                    id: item.id,
                    quantity: 0, 
                }
            ))
            console.log(alldata);
            console.log(idQuantity);

            setData([...women, ...jewelry]);
            setFullData([...women, ...jewelry]);
            setQuantity(idQuantity);

        }   else {
            fetchWomen();
        }
        


    }, [])


    return (
        <>
            {loading && <div className="loader">Loading...</div>}
            <div className="searchbar">
                <input onChange={(e) => handleSearch(e)} placeholder="search" disabled={disableInput}></input>
                <div className="imgfilter">
                    <img src={filter} alt="filter icon" />
                    <form action="" method="post">
                        <h1>price filter</h1>
                        <select onChange={handleFilter} name="filter" id="filter">
                            <option value="none">None</option>
                            <option value="low">low-high</option>
                            <option value="high">high-low</option>
                        </select>
                    </form>
                </div>
            </div>

            {data.length > 0 && <div className="womenitem">
                {data.length > 0 &&
                    data.map((item) => (
                        <div className="itemcards" key={item.id}>
                            <div className="title">{item.title}</div>
                            <div className="img">
                                <img src={item.image} alt="item image" />
                            </div>
                            <div className="price">${item.price}</div>
                            <div><Link to={`/shop/${item.id}`} state={{item: fullData.filter((data) => data.id === item.id)}}>View</Link></div>
                            <div className="quantity">
                                <button className="add" onClick={(e) => handleQuantity(e, item.id, "plus")}>+</button>
                                <form onSubmit={handleSubmit} id="myform" action="" method="post"><input value={handleValue(item.id)} onChange={(e) => handleQuantity(e, item.id)} type="text" pattern="^(0|[1-9][0-9]*)$" /></form>
                                <button className="sub"onClick={(e) => handleQuantity(e, item.id, "minus")}>-</button>
                            </div>
                            <button type="submit" form="myform">Add to cart</button>
                        </div>
                ))}


            </div>}

        </>
    )
}