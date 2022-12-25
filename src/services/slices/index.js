import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients';
import burger from './burger';
import order from './order';
import auth from './auth';

export default configureStore({
  reducer: {
    ingredients,
    order,
    burger,
    auth,
  },
});
