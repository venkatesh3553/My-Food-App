import { FaLocationDot } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Context from "../../context/Context";

import "./index.css"
const Headers =()=>(
    <Context.Consumer>
        {value=>{
            const{userSearch ,  onChangeInput , onKeyDownInput}=value
                console.log(userSearch)
            return(
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
                         
                        <div className="input-container">
                            <FaSearch className="search-icon" />
                            <input onChange={onChangeInput} value={userSearch} className="search-box" placeholder="Restaurant name or Dish..." />
                        </div>         
                        <div className="wallet-name-container">
                            <p className="wallet"><FaWallet className="wallet-icon"/></p>
                            <p className="V">V</p>
                        </div>
                    </div>

                         <div className="input-container-mobail">
                            <FaSearch className="search-icon" />
                            <input onChange={onChangeInput} value={userSearch} className="search-box" placeholder="Restaurant name or Dish..." />
                        </div>  
                 </div>
            )
        }}
        
       
    </Context.Consumer>
)
export default Headers