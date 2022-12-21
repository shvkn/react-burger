import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  ConstructorPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from '../../pages';
import { RouterPaths } from '../../utils/constants';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <main className={`${styles.main}`}>
          {/*<div>*/}
          <Switch>
            <Route exact path={RouterPaths.BASE} component={ConstructorPage} />
            <Route exact path={RouterPaths.LOGIN} component={LoginPage} />
            <Route exact path={RouterPaths.REGISTER} component={RegistrationPage} />
            <Route exact path={RouterPaths.FORGOT_PASSWORD} component={ForgotPasswordPage} />
            <Route exact path={RouterPaths.RESET_PASSWORD} component={ResetPasswordPage} />
            <Route path={RouterPaths.PROFILE}>
              <ProfilePage />
            </Route>
          </Switch>
          {/*</div>*/}
        </main>
      </Router>
    </div>
  );
}

export default App;
