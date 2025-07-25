import './index.css'
import { FaStar } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import Context from '../../context/Context';
const RestaurantFoodItems=(props)=>(
    <Context.Consumer>
        {value=>{
            const{addFood ,addfoodlist}= value
            const{list}=props
            // const filerrestaurantfood = list.filter(eactItem =>
            //     eactItem.name.toLowerCase().includes(userSearch.toLocaleLowerCase())
            // )
            const{id , name , price , quantity , image , rating , timing , totalPepoles}= list 
            const isAdd = addfoodlist.find(item => item.id === id)?.isAdd || false;
            return(
                <>
                  <li className='RestaurantFoodItems-li'>
                    <div className='image-name-price'>
                        <img src={image} alt="image" className='RestaurantFoodItems-img'/>
                        <div className='price-name'>
                            <p className='RestaurantFoodItems-name'>{name}</p>
                            <p className='RestaurantFoodItems-price'>₹{price}</p>
                        </div>
                    </div>
                    <div className='rationg-people-timing-addbuton' >
                    <div className='rationg-people-timing'>
                        <dvi className='rating-totalPepoles'>
                            <p className='RestaurantFoodItems-rating'>{rating}<FaStar/></p>
                            <p className='RestaurantFoodItems-totalPepoles'>({totalPepoles})</p>
                        </dvi>
                        <p className='RestaurantFoodItems-timing'>{timing} Mins</p>
                            
                    </div>
                     {isAdd ? (
                                    
                                                    <div className='ok-msg' >
                                                        <MdOutlineDone className='ok-icon'/>
                                                        <button disabled className='ok-food-btn'>
                                                        Added 
                                                        </button>
                                                                         
                                                    </div>
                                ) : (
                                <button onClick={() => addFood(list)} className="add-button">
                                  Add                                        </button>
                            )} 
                    </div>
                                                
                </li>
                
                                           
                </>
                
            )
        }}
    </Context.Consumer>

)
    
    

export default RestaurantFoodItems 




      
                