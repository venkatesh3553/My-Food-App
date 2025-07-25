import { Component } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context"; 
import './index.css';

class Items extends Component {
  state = { itemList: [] };

  componentDidMount() {
    this.getItems();
  }

  getItems = async () => {
    const url = 'https://fodjson.onrender.com/api/item/';
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ itemList: data });
  };

  render() {
    const { itemList } = this.state;

    return (
      <Context.Consumer>
        {value => {
          return (
            <>
              <ul className="items-ul">
                {itemList.map(eachItem => (
                  <Link to={`/items/${eachItem.id}`} key={eachItem.id} className="items-links">
                    <img src={eachItem.image} className="items-img" alt={eachItem.name} />
                    <p className="items-name">{eachItem.name}</p>
                  </Link>
                ))}
              </ul>
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Items;
