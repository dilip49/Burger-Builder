import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES  = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component{

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchasableState (ingredients){
    const sum = Object.keys(ingredients)
      .map(igKey =>{
        return ingredients[igKey];
      })
      .reduce((sum, el)=>{
        return sum + el;
      },0);
      this.setState({purchasable: sum > 0 })

  }

  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    
    const updatedIngredients = {
      ...this.state.ingredients
    };
    
    updatedIngredients[type] = updatedCount;
    const priceAddition =  INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    
    if (oldCount <= 0){
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceRemoval = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemoval;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchasableState(updatedIngredients);
  }

  purchasing = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () =>{
     alert('You can continue')
  }


  render(){

    const disableInfo = {
      ...this.state.ingredients
    }

    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return(
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice.toFixed(2)}
            ingredients = {this.state.ingredients} 
            />
        </Modal>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls  
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disableInfo}
          purchasable = {this.state.purchasable}
          ordered = {this.purchasing}
          price = {this.state.totalPrice}
        />
      </Auxiliary>
    )
  }
}

export default BurgerBuilder;