import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavButton from '../nav-button/nav-button';
import NavMenu from '../nav-menu/nav-menu';

function AppHeader() {

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={`${styles.inner}`}>
        <NavMenu>
          <NavButton
            icon={<BurgerIcon type={`primary`}/>}
            text={'Конструктор'}
            active={true}
          />
          <NavButton
            icon={<ListIcon type={`secondary`}/>}
            text={'Лента заказов'}
            active={false}
            extraClass={'ml-2'}
          />
        </NavMenu>

        <Logo/>

        <NavMenu rightContent={true}>
          <NavButton
            icon={<ProfileIcon type={`secondary`}/>}
            text={'Личный кабинет'}
            active={false}
          />
        </NavMenu>
      </div>
    </header>
  );
}

export default AppHeader;
