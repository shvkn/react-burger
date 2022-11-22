import { combineReducers } from 'redux';
import { burgerReducer } from './burger-reducer';
import { orderReducer } from './order-reducer';
import { ingredientsReducer } from './ingredients-reducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: burgerReducer,
});

export default rootReducer;
