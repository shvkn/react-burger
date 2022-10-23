import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import '../../style/common.css';
import './App.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import {data} from '../../utils/data';

function App() {
  return (
    <div className='App'>
      <AppHeader/>
      <AppMain data={data}/>
    </div>
  );
}

export default App;
