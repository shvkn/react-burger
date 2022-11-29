import { burgerReducer } from '../reducers/burger-reducer';
import { orderReducer } from '../reducers/order-reducer';
import ingredients from './ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    ingredients,
    order: orderReducer,
    burger: burgerReducer,
  },
});
