import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavButton from '../nav-button/nav-button';
import NavMenu from '../nav-menu/nav-menu';

function AppHeader() {

  return (
    <header className={`${styles.header} p-4`}>
      <div className={`${styles.innerContainer}`}>
        <NavMenu>
          <NavButton
            icon={<BurgerIcon type="primary"/>}
            text="Конструктор"
            isActive={true}
          />
          <NavButton
            icon={<ListIcon type="secondary"/>}
            text="Лента заказов"
            isActive={false}
          />
        </NavMenu>

        <Logo/>

        <NavMenu rightContent={true}>
          <NavButton
            icon={<ProfileIcon type="secondary"/>}
            text="Личный кабинет"
            isActive={false}
          />
        </NavMenu>
      </div>
    </header>
  );
}

export default AppHeader;
