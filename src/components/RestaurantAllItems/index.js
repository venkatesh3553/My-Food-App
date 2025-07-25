import withRouter from "../withRouter";
import { Component } from "react";
import RestaurantFoodItems from "../RestaurantFoodItems";
import Headers from '../Headers';
import { FaStar } from "react-icons/fa";
import Context from "../../context/Context";
import CartMsg from "../CartMsg";
import ClipLoader from "react-spinners/ClipLoader";
import './index.css';

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class RestaurantAllItems extends Component {
  state = {
    restaurant: {},
    foodlist: [],
    apiStatusIs: apiStatus.initial,
  };

  componentDidMount() {
    this.getFoodData();
  }

  getFoodData = async () => {
    this.setState({ apiStatusIs: apiStatus.inProgress });
    const { id } = this.props.router.params;
    const url = `https://fodjson.onrender.com/api/food/${id}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.setState({
          restaurant: data,
          foodlist: data.foodItems,
          apiStatusIs: apiStatus.success,
        });
      } else {
        this.setState({ apiStatusIs: apiStatus.failure });
      }
    } catch (error) {
      this.setState({ apiStatusIs: apiStatus.failure });
    }
  };

  renderLoadingView = () => (
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

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-7835157-6251377.png"
        alt="Failure view"
        className="cat-img"
      />
      <p className="empty-search-text">Something went wrong. Please try again.</p>
    </div>
  );

  renderSuccessView = (filterrestaurantfood, restaurant) => (
    <>
      <hr className="hr-mobail" />
      <div className="restaurant-container">
        <div className="ratsaurant-details">
          <div className="restaurant-name-rating-all">
            <h1 className="restaurant-name"> {restaurant.name}</h1>
            <div className="rating-peoples-rating">
              <div className="rating-card">
                <p className="restaurant-rating">
                  {restaurant.rating} <FaStar />
                </p>
                <p className="restaurant-totalPepoles">({restaurant.totalPepoles} Peoples)</p>
              </div>
              <div className="rating-card">
                <p className="restaurant-distance">{restaurant.distance}km</p>
                <p className="restaurant-timing">{restaurant.timing} Mins</p>
              </div>
            </div>
          </div>
          <img src={restaurant.image} className="restaurant-img" alt="restaurant" />
        </div>
      </div>
      <hr className="hr" />
      <ul className="restaurant-ul">
        {filterrestaurantfood.length === 0 ? (
          <div className="empty-search-container">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
              alt="No food found"
              className="cat-img"
            />
            <p className="empty-search-text">No food items found</p>
          </div>
        ) : (
          filterrestaurantfood.map(eachItem => (
            <RestaurantFoodItems list={eachItem} key={eachItem.id} />
          ))
        )}
      </ul>
    </>
  );

  renderViewBasedOnStatus = (filterrestaurantfood, restaurant) => {
    const { apiStatusIs } = this.state;
    switch (apiStatusIs) {
      case apiStatus.success:
        return this.renderSuccessView(filterrestaurantfood, restaurant);
      case apiStatus.inProgress:
        return this.renderLoadingView();
      case apiStatus.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    const { restaurant, foodlist } = this.state;

    return (
      <Context.Consumer>
        {value => {
          const { userSearch } = value;
          const filterrestaurantfood = foodlist.filter(eachItem =>
            eachItem.name.toLowerCase().includes(userSearch.toLowerCase())
          );

          return (
            <>
              <Headers />
              {this.renderViewBasedOnStatus(filterrestaurantfood, restaurant)}
              <CartMsg />
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(RestaurantAllItems);
