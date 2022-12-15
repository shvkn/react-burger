import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import ConstructorPage from '../../pages/constructor';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        <Router>
          <Switch>
            <Route path={'/'} exact={true}>
              <ConstructorPage />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
