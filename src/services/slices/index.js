import { orderReducer } from '../reducers/order-reducer';
import ingredients from './ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';
import burger from './burgerSlice';
export default configureStore({
  reducer: {
    ingredients,
    order: orderReducer,
    burger,
  },
});
