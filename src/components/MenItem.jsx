import { useParams, useLocation } from "react-router-dom";
import starIcon from "../rating.svg"
import GoldStar from "../goldstar.svg"

export function MenItem() {
    const { men } = useParams();
    console.log("men", men);
    if (men > 20 || men < 1) {
        throw new Error("Sorry Page not Found");
    }
    const location = useLocation();

    const {item} = location.state;
    console.log(item);
    const rating = Math.floor(item[0].rating.rate);


    return (
        <div className="singlemen">
            <div className="singlecard">
                <div className="title">{item[0].title}</div>
                <div className="img">
                    <img src={item[0].image} alt="mens item picture" />
                </div>
                <div className="description">
                    <div>Product Description:</div>
                    <p className="desc">{item[0].description}</p>
                </div>
                <div className="rating">
                    <div className="rate">Rating: {Math.floor(item[0].rating.rate)}</div>
                    <div className="starimages">
                        {rating >= 1 ? <img src={GoldStar} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 2 ? <img src={GoldStar} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 3 ? <img src={GoldStar} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 4 ? <img src={GoldStar} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                        {rating >= 5 ? <img src={GoldStar} alt="star icons" /> : <img src={starIcon} alt="star icons" />}
                    </div>
                </div>
                <div className="price">${item[0].price}</div>

            </div>

        </div>
    )
}