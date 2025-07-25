import { Component } from "react";
import withRouter from "../withRouter";
import Headers from "../Headers";
import { MdOutlineDone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import CartMsg from "../CartMsg";
import Context from "../../context/Context";

import ClipLoader from "react-spinners/ClipLoader"; 

import './index.css';

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class ItemsFood extends Component {
  state = {
    itemList: [],
    apiStatusIs: apiStatus.initial
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = async () => {
    this.setState({ apiStatusIs: apiStatus.inProgress });
    try {
      const { id } = this.props.router.params;
      const url = `https://fodjson.onrender.com/api/itemfood/${id}`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        this.setState({ itemList: data.itemFood, apiStatusIs: apiStatus.success });
      } else {
        this.setState({ apiStatusIs: apiStatus.failure });
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      this.setState({ apiStatusIs: apiStatus.failure });
    }
  };

  renderSuccess = (filterItems, addfoodlist, addFood) => (
    <ul className="itemfood-ul">
      {filterItems.length === 0 ? (
        <div className="empty-search-container">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
            alt="No food found"
            className="cat-img"
          />
          <p className="empty-search-text">No food items found</p>
        </div>
      ) : (
        filterItems.map(eachItem => {
          const isAdd = addfoodlist.find(item => item.id === eachItem.id)?.isAdd || false;
          return (
            <li className="RestaurantFoodItems-li" key={eachItem.id}>
              <div className="image-name-price">
                <img src={eachItem.image} alt="food" className="RestaurantFoodItems-img" />
                <h1 className="restaurantFoodItems-restaurantname-laptop">
                  {eachItem.restaurantname}(Restaurant)
                </h1>
                <div className="price-name">
                  <h1 className="restaurantFoodItems-restaurantname-mobail">
                    {eachItem.restaurantname}
                    <br />(Restaurant)
                  </h1>
                  <p className="RestaurantFoodItems-name">{eachItem.name}</p>
                  <p className="RestaurantFoodItems-price">₹{eachItem.price}</p>
                </div>
              </div>
              <div className="rationg-people-timing-addbuton">
                <div className="rationg-people-timing">
                  <div className="rating-totalPepoles">
                    <p className="RestaurantFoodItems-rating">
                      {eachItem.rating} <FaStar />
                    </p>
                    <p className="RestaurantFoodItems-totalPepoles">({eachItem.totalPepoles})</p>
                  </div>
                  <p className="RestaurantFoodItems-timing">{eachItem.timing} Mins</p>
                </div>
                {isAdd ? (
                  <div className="ok-msg">
                    <MdOutlineDone className="ok-icon" />
                    <button disabled className="ok-food-btn">Added</button>
                  </div>
                ) : (
                  <button onClick={() => addFood(eachItem)} className="add-button">Add</button>
                )}
              </div>
            </li>
          );
        })
      )}
    </ul>
  );

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something went wrong</h1>
    </div>
  );

  renderLoader = () => (
    <div className="loader-container">
      <ClipLoader
        color="green"
        loading='true'
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );

  render() {
    const { itemList, apiStatusIs } = this.state;

    return (
      <Context.Consumer>
        {value => {
          const { userSearch, addFood, addfoodlist } = value;
          const filterItems = itemList.filter(eachItem =>
            eachItem.name.toLowerCase().includes(userSearch.toLowerCase())
          );

          let renderView;
          switch (apiStatusIs) {
            case apiStatus.inProgress:
              renderView = this.renderLoader();
              break;
            case apiStatus.success:
              renderView = this.renderSuccess(filterItems, addfoodlist, addFood);
              break;
            case apiStatus.failure:
              renderView = this.renderFailure();
              break;
            default:
              renderView = null;
          }

          return (
            <>
              <Headers />
              {renderView}
              <CartMsg />
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(ItemsFood);
