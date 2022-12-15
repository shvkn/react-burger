import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { ConstructorPage, LoginPage, RegistrationPage, ForgotPasswordPage } from '../../pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {/*<div>*/}
        <Router>
          <Switch>
            <Route exact path={'/'} component={ConstructorPage} />
            <Route exact path={'/login'} component={LoginPage} />
            <Route exact path={'/register'} component={RegistrationPage} />
            <Route exact path={'/forgot-password'} component={ForgotPasswordPage} />
          </Switch>
        </Router>
        {/*</div>*/}
      </main>
    </div>
  );
}

export default App;
