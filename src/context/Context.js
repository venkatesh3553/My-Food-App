import React from "react";
const Context= React.createContext({
    userSearch:'',
    onChangeInput:()=>{},
    
    addFood :[],
    addFoodItemToGetReady:()=>{},
    increaseFood:()=>{},
    decreaseFood:()=>{},
    removeFood:()=>{},
})
export default Context