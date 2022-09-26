import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  //update state and get new foods to display dynamically
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();

    //using the spread operator (...) to make a copy of our foods array, and insert it into a new array
    //also adding the newly generated food returned by the getNewRandomSpicyFood function at the end of the array.
    const newFoodArray=[...foods, newFood];
    //when updating state, it's important to always pass a new object/array to setState. The spread operator makes a copy of the original array
    //React will only re-render a component when the state is set with a new value; hence, the need to create a new copy of the original array to pass to the setter function
    setFoods(newFoodArray);
    console.log(newFood);
  }

  //create a new array that doesn't include a specific element using the .filter method
  //this returns a new array based on which elements match the criteria in the callback function.
  function handleClick (id){
    const newFoodArray=foods.filter((food)=>food.id!==id);
    setFoods(newFoodArray)
      console.log (newFoodArray)
  }

  function handleLiClick(id) {
    //.map will iterate through the array and return a new array
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
    //Whatever value is returned by the callback function that is passed to .map will be added to this new array
        return {
    //If the ID of the food iterated over matches the ID of the food updated, return a new food object with the heat level incremented by 1
    //Otherwise, return the original food object
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  //use .map on our array to generate an array of <li> elements from our array of foods, and display them in the <ul>
  const foodList = foods.map((food) => (
    //add a click handler to the <li> elements, and pass in the id of the food that is being removed
    <li key={food.id} onClick={()=>handleClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;

//Deliverables
// Shows a button to generate a new spicy food
// When the button is clicked, adds the newly generated food to a list: spread operator
// using a state variable to hold an array of spicy foods;
// using that array to display each spicy food as an <li>; and
// adding a new spicy food to the array when the button is clicked.

// Add: use the spread operator ([...])
// Remove: use .filter
// Update: use .map
