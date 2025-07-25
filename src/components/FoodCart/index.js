import { Component } from "react";
import Context from "../../context/Context";
import { FaPlus, FaMinus } from "react-icons/fa";
import './index.css'; 
import { FaLocationDot } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { IoMdHome } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { CgNotes } from "react-icons/cg";

class FoodCart extends Component {
  state={orderIs:false}
  order=()=>{
    this.setState({orderIs:true})
  }
 
  render() {
    const{orderIs}=this.state
    return (
      <Context.Consumer>
        {value => {
          const { cartlength, addfoodlist,clearCart, increaseFood, decreaseFood } = value;
          let amount = 0;
          addfoodlist.forEach(eachItem => {
            amount += eachItem.price * eachItem.quantity;
          });
         
          return (
           
            <>
            {orderIs ? (
              <div className="order-success-card">
                <img src="https://img.freepik.com/premium-vector/man-enjoy-eating-clean-hot-foods_134553-358.jpg?w=1380"
                className="fod-img" alt="Image"/>
                <h1 className="fod-name">Your Order Placed</h1>
               <Link to='/'> <button className="food-btn" onClick={clearCart}>Go Home</button></Link>
              </div>
            ):(
              cartlength >=1  ?(
              
                <>
                    <div className="header-bg-container">
                              
                               <div className="header-container">
                                   <div className="home-location-container">
                                       <p className="home-head"><FaLocationDot className="location-icon"/> Home</p>
                                       <p>Wood Nager, chirala, 4-34</p> 
                                       <Link to='/' className="backbutton" style={{
                                           hover:<p>VSP</p>
                                       }}>
                                           <IoChevronBackCircleOutline />
                                       </Link> 
                                   </div>      
                                    
                                         
                                   <div className="wallet-name-container">
                                       <p className="wallet"><FaWallet className="wallet-icon"/></p>
                                       <p className="V">V</p>
                                   </div>
                               </div>           
            </div>
               <div className="gold-card">
                <div className="gold-pera-button">
                    <div className="p-p">
                        <p className="gold-pera1"><FaCrown className="FaCrown"/>Get gold for 3 months</p>
                        <p className="gold-pera2">Unlimited free deliveries & more
                          <br/> benefits
                        </p>
                    </div>
                    <div className="gold-button-card">
                      <button className="gold-button">Add</button>
                      <p className="gold-30">₹30</p>
                    </div>
                </div>
                <hr className="hr-gold"/>
                  <div className="cart-bg">
              {addfoodlist.map(eachItem => (
                <li className="food-cart-item" key={eachItem.id}>
                  <div className="food-cart-left">
                    <img src={eachItem.image} alt={eachItem.name} className="food-cart-img" />
                    <p className="food-cart-name">{eachItem.name}</p>
                  </div>
                  <p className="food-cart-price">₹{eachItem.quantity * eachItem.price}</p>
                  <div className="food-cart-controls">
                    <button className="btn-minus" onClick={() => decreaseFood(eachItem.id)}>
                      <FaMinus />
                    </button>
                    <p className="food-cart-qty">{eachItem.quantity}</p>
                    <button className="btn-plus" onClick={() => increaseFood(eachItem.id)}>
                      <FaPlus />
                    </button>
                  </div>
                </li>
              ))}
                  </div>
               </div>
                
              <div className="add-card">
                <div >
                  <p className="p"><IoIosTime className="icon"/> Delivery 30-40 mins</p>
                  <p className="pp">What is later? should it</p>
                </div>
                <hr className="hr-gold"/>
                <div>
                  <p className="p"><IoMdHome className="icon"/> Delivery at Home</p>
                  <p className="pp">Chirala, Wood Nager, 3-34</p>
                </div>
                <hr className="hr-gold"/>
                <div>
                  <p className="p"> <FaPhoneAlt className="icon"/>Venky, 91+6305168684</p>
                </div>
                <hr className="hr-gold"/>
                <div>
                  <p className="p"><CgNotes className="icon"/>Total Bill:- {amount}</p>
                  <p className="pp">You saved ₹20</p>
                </div>
              </div>
              {cartlength > 0 && (
                <div className="food-cart-summary">
                  <div>
                    <p className="pay-on-delivery">Pay on delivery</p>
                    <p className="payment-method">UPI/CASH</p>
                  </div>
                  <button onClick={this.order} className="place-order-button">
                    <p className="total-price">₹{amount} <br /> Total</p>
                    Place Order
                  </button>
                </div>
              )}
                </>

             ):(
                <div className="empty-card">
                  <h1 className="cat-head">Your Cart is empty</h1>
                  <img src="https://thumbs.dreamstime.com/b/angry-cat-laptop-flat-icon-electric-device-angry-cat-laptop-flat-icon-electric-device-vector-illustration-264416053.jpg" className="cat-img"/>
                  <Link to="/">
                    <button className="cat-button">Go to Home</button>
                  </Link>
                  </div>
             )
              
             
            )
            }

            
             
            
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default FoodCart;
