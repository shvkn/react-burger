import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  withRouter,
} from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import {
  ConstructorPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
} from '../../pages';
import { RouterPaths } from '../../utils/constants';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { getUser, logout } from '../../services/actions/auth';
import { fetchIngredients } from '../../services/actions/ingredients';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, []);

  const handleClose = (e) => {
    history.goBack();
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        <Switch location={background ?? location}>
          <Route exact path={RouterPaths.BASE}>
            <ConstructorPage />
          </Route>

          <Route path={RouterPaths.LOGIN}>
            <LoginPage />
          </Route>

          <Route path={RouterPaths.REGISTER}>
            <RegistrationPage />
          </Route>

          <Route path={RouterPaths.FORGOT_PASSWORD}>
            <ForgotPasswordPage />
          </Route>

          <Route path={RouterPaths.RESET_PASSWORD}>
            <ResetPasswordPage />
          </Route>

          <ProtectedRoute path={RouterPaths.PROFILE}>
            <ProfilePage />
          </ProtectedRoute>

          <Route path={RouterPaths.INGREDIENT_BY_ID}>
            <IngredientPage />
          </Route>
        </Switch>
        {background && (
          <Route path={RouterPaths.INGREDIENT_BY_ID}>
            <Modal handleClose={handleClose} title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </main>
    </div>
  );
}

export default App;
