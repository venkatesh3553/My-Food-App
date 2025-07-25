import { Component } from "react";
import HomeRestaurant from "../HomeRestaurants";
import Headers from "../Headers";
import Items from "../Items";
import Context from "../../context/Context";
import CartMsg from "../CartMsg";

import { FaStar } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";

import { ClipLoader } from "react-spinners";

import './index.css';

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Home extends Component {
  state = { list: [], apiStatusIs: apiStatus.initial };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ apiStatusIs: apiStatus.inProgress });
    try {
      const url = 'https://fodjson.onrender.com/api/food/';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.setState({ list: data, apiStatusIs: apiStatus.success });
      } else {
        this.setState({ apiStatusIs: apiStatus.failure });
      }
    } catch (err) {
      console.log(err);
      this.setState({ apiStatusIs: apiStatus.failure });
    }
  };
  apiSuccess = () => {
    const { list } = this.state;

    return (
      <Context.Consumer>
        {value => {
          const { userSearch, searchfood, addFood, addfoodlist } = value;

          const filteredList = list.filter(item =>
            item.name.toLowerCase().includes(userSearch.toLowerCase())
          );

          const filterfood = searchfood.filter(eachItem =>
            eachItem.name.toLowerCase().includes(userSearch.toLowerCase())
          );

          return (
            <>
              <Headers />
              <Items />

              {userSearch.length >= 1 ? (
                <>
                  <h1 className="rest-hed">Your Food</h1>
                  {filterfood.length === 0 ? (
                    <div className="empty-search-container">
                      <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                        alt="No items found"
                        className="cat-img"
                      />
                      <p className="empty-search-text">No food items found</p>
                    </div>
                  ) : (
                    <ul className="itemfood-ul">
                      {filterfood.map(eachItem => {
                        const isAdd = addfoodlist.find(item => item.id === eachItem.id)?.isAdd || false;

                        return (
                          <li className='RestaurantFoodItems-li' key={eachItem.id}>
                            <div className='image-name-price'>
                              <img src={eachItem.image} alt="food" className='RestaurantFoodItems-img' />
                              <h1 className="restaurantFoodItems-restaurantname-laptop">
                                {eachItem.restaurantname}<br />(Restaurant)
                              </h1>
                              <div className='price-name'>
                                <h1 className="restaurantFoodItems-restaurantname-mobail">
                                  {eachItem.restaurantname}<br />(Restaurant)
                                </h1>
                                <p className='RestaurantFoodItems-name'>{eachItem.name}</p>
                                <p className='RestaurantFoodItems-price'>₹{eachItem.price}</p>
                              </div>
                            </div>
                            <div className='rationg-people-timing-addbuton'>
                              <div className='rationg-people-timing'>
                                <div className='rating-totalPepoles'>
                                  <p className='RestaurantFoodItems-rating'>{eachItem.rating}<FaStar /></p>
                                  <p className='RestaurantFoodItems-totalPepoles'>({eachItem.totalPepoles})</p>
                                </div>
                                <p className='RestaurantFoodItems-timing'>{eachItem.timing} Mins</p>
                              </div>
                              {isAdd ? (
                                <div className="ok-msg">
                                  <MdOutlineDone className='ok-icon' />
                                  <button disabled className='ok-food-btn'>Added</button>
                                </div>
                              ) : (
                                <button onClick={() => addFood(eachItem)} className="add-button">Add</button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : null}

              <h1 className="rest-hed">All Restaurant's</h1>
              {userSearch.length >= 1 && filteredList.length === 0 ? (
                <div className="empty-search-container">
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/06/18/02/27/1000_F_618022756_5rubX0pNSrMZtXCOFVDysExfptKCFr13.jpg"
                    alt="No restaurants found"
                    className="cat-img1"
                  />
                  <p className="empty-search-text">No restaurants found</p>
                </div>
              ) : (
                <ul className="ul-home-container">
                  {filteredList.map(eachItem => (
                    <HomeRestaurant key={eachItem.id} list={eachItem} />
                  ))}
                </ul>
              )}
              <CartMsg />
            </>
          );
        }}
      </Context.Consumer>
    );
  };

  apiFail = () => (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={this.getData}>Retry</button>
    </div>
  );

  apiProcess = () => (
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
    const { apiStatusIs } = this.state;

    switch (apiStatusIs) {
      case apiStatus.success:
        return this.apiSuccess();
      case apiStatus.failure:
        return this.apiFail();
      case apiStatus.inProgress:
        return this.apiProcess();
      default:
        return null;
    }
  }
}

export default Home;
