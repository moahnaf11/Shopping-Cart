import { useParams, useLocation } from "react-router-dom";
import starIcon from "../rating.svg"

export function WomenItem() {
    const { women } = useParams();
    console.log(women);
    const location = useLocation()

    const {item} = location.state;
    console.log(item);
    const rating = Math.floor(item[0].rating.rate);


    return (
        <div className="singlewomen">
            <div className="singlecard">
                <div className="title">{item[0].title}</div>
                <div className="img">
                    <img src={item[0].image} alt="womens item picture" />
                </div>
                <div className="description">
                    <div>Product Description:</div>
                    <p className="desc">{item[0].description}</p>
                </div>
                <div className="rating">
                    <div className="rate">Rating: {Math.floor(item[0].rating.rate)}</div>
                    <div className="starimages">
                        {rating >= 1 ? <img style={{backgroundColor: "#facc15"}} src={starIcon} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 2 ? <img style={{backgroundColor: "#facc15"}} src={starIcon} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 3 ? <img style={{backgroundColor: "#facc15"}} src={starIcon} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 4 ? <img style={{backgroundColor: "#facc15"}} src={starIcon} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 5 ? <img style={{backgroundColor: "#facc15"}} src={starIcon} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                    </div>
                </div>
                <div className="price">${item[0].price}</div>

            </div>

        </div>
    )
}