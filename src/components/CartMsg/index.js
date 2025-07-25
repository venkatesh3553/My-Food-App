import Context from "../../context/Context";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import './index.css'; // Import CSS file

const CartMsg = () => (
  <Context.Consumer>
    {value => {
      const { cartlength } = value;

      return cartlength >= 1 ? (
        <div className="cart-msg-container">
          <Link to="/food/cart/" className="cart-msg-link">
            <button className="cart-msg-button">
              {cartlength} Items Added
              <p className="cart-msg-text">
                View Cart <IoIosArrowForward className="cart-msg-icon" />
              </p>
            </button>
          </Link>
        </div>
      ) : <p>Empty</p>;
    }}
  </Context.Consumer>
);

export default CartMsg;
