import React from 'react';
import '../../style/common.css';
import './App.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import {data} from '../../utils/data';
import '@ya.praktikum/react-developer-burger-ui-components';

function App() {

  const dataTypes =
    [{key: 'bun', name: 'Булки'}, {key: 'sauce', name: 'Соусы'}, {key: 'main', name: 'Начинки'}];

  const state = {
    bun: '60666c42cc7b410027a1a9b1',
    supplements: [
      '60666c42cc7b410027a1a9b9',
      '60666c42cc7b410027a1a9b4',
      '60666c42cc7b410027a1a9bc',
      '60666c42cc7b410027a1a9bb',
      '60666c42cc7b410027a1a9b6',
      '60666c42cc7b410027a1a9b7',
    ],
    total: 999
  };

  return (
    <div className='App'>
      <AppHeader/>
      <AppMain data={data} dataTypes={dataTypes} state={state}/>
    </div>
  );
}

export default App;
