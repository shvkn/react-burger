import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredientsSlice';
import burger from './burgerSlice';
import order from './orderSlice';
export default configureStore({
  reducer: {
    ingredients,
    order,
    burger,
  },
});
