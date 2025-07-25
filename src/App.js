import { Component } from "react";
import { BrowserRouter , Routes ,Route ,Navigate  } from "react-router-dom";

import "./App.css"
import Home from "./components/Home";
import RestaurantAllItems from "./components/RestaurantAllItems";
import ItemsFood from "./components/ItemsFood";
import Context from "./context/Context";
import FoodCart from "./components/FoodCart";

class App extends Component{
  state={userSearch:"" , searchfood:[] , addfoodlist:[] , isAdd:false}

  componentDidMount() {
    this.getItems();
  }

  clearCart=()=>{
    this.setState({addfoodlist:[]})
  }
  getItems = async () => {
    const url = 'https://fodjson.onrender.com/api/searchfood/';
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ searchfood: data});
    
  };

 onChangeInput = (e) => {  
    this.setState({ userSearch: e.target.value });
  }

  addFood = (food) => {
  const { addfoodlist } = this.state;

  const foodObject = addfoodlist.find(eachItem => eachItem.id === food.id);

  if (foodObject) {
    this.setState(prevState => ({
      addfoodlist: prevState.addfoodlist.map(eachItem => {
        if (eachItem.id === food.id) {
          const updatedQuantity = eachItem.quantity + (food.quantity || 1);
          return { ...eachItem, quantity: updatedQuantity, isAdd: true };
        }
        return eachItem;
      })
    }));
  } else {
    const updatedList = [
      ...addfoodlist,
      { ...food, quantity: food.quantity || 1, isAdd: true }
    ];
    this.setState({ addfoodlist: updatedList });
  }
};

increaseFood=(id)=>{
  this.setState(prevState=>({
    addfoodlist : prevState.addfoodlist.map(eachItem=>{
      if(id === eachItem.id){
        return{...eachItem, quantity:eachItem.quantity +1}
      }
      return eachItem
    })
  }))
}
removeFood=(id)=>{
  const{addfoodlist}=this.state
  const updatefood = addfoodlist.filter(eachItem => eachItem.id !== id)
  this.setState({addfoodlist: updatefood})
}
decreaseFood=(id)=>{
  const{addfoodlist}=this.state
  const food = addfoodlist.find(eachItem => eachItem.id === id)
  if( food.quantity >1){
    this.setState(prevState=>({
      addfoodlist:prevState.addfoodlist.map(eachItem =>{
        if(id === eachItem.id){
          return {...eachItem , quantity:eachItem.quantity-1}
        }
        return eachItem
      })
    }))
  }else{
    this.removeFood(id)
  }
}
  
  render(){
    const{userSearch , searchfood , addfoodlist , isAdd}=this.state
     const cartlength = addfoodlist.length
        return(
      <Context.Provider 
        value={{
          userSearch:userSearch , onChangeInput: this.onChangeInput, onKeyDownInput:this.onKeyDownInput,
          searchfood:searchfood, addFood:this.addFood ,cartlength:cartlength , addfoodlist:addfoodlist,
          increaseFood:this.increaseFood, decreaseFood:this.decreaseFood, isAdd:isAdd , clearCart:this.clearCart
        }}
      >
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route  path="/foodItems/:id" element={<RestaurantAllItems/>}/>
              <Route  path="/items/:id" element={<ItemsFood/>}/>
              <Route  path="/food/cart/" element={<FoodCart/>}/>
            </Routes>
          </BrowserRouter>
        </>
      </Context.Provider>
    )
  }
}
export default App
