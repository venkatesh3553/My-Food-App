import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";


import "./index.css"
const HomeRestaurant =props=>{
    const{list}= props
    const{name , image , id , offer, rating , timing, totalPepoles , distance , price}=list
     
    return(
        <>
            <li className="homerestaurant-li">
                <Link to={`/foodItems/${id}`} className="link">
                    <img src={image} alt='image' className="homerestaurant-image"/>
                    <div className="name-rating-timing">
                        <h1 className="homerestaurant-name">{name}</h1>
                        <div className="rating-timing">
                            <p className="homerestaurant-timing">{timing} Mins</p>
                            <p className="homerestaurant-rating">{rating}<FaStar/></p>
                        </div>
                    </div>
                    <div className="km-people">
                        <p className="homerestaurant-distance">{distance}Km</p>
                        <p className="homerestaurant-totalPepoles">{totalPepoles} Peoples</p>
                    </div>
                    <hr className="hr"/>
                    <p className="homerestaurant-offer"><BiSolidOffer/> {offer}</p>
                </Link>
            </li>
            
        </>
    )
}
export default HomeRestaurant