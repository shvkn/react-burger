import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
} from '../../pages';
import { RouterPaths } from '../../utils/constants';
import ProtectedRoute from '../protected-route/protected-route';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <main className={`${styles.main}`}>
          <Switch>
            <Route exact path={RouterPaths.BASE} component={ConstructorPage} />
            <Route exact path={RouterPaths.LOGIN} component={LoginPage} />
            <Route exact path={RouterPaths.REGISTER} component={RegistrationPage} />
            <Route exact path={RouterPaths.FORGOT_PASSWORD} component={ForgotPasswordPage} />
            <Route exact path={RouterPaths.RESET_PASSWORD} component={ResetPasswordPage} />
            <ProtectedRoute path={RouterPaths.PROFILE}>
              <ProfilePage />
            </ProtectedRoute>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
