// TODO Временно отключено из-за якорной ссылки
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={`${styles.container}`}>
        <nav className={styles.nav}>
          <ul className={styles.items}>
            <li className={styles.item}>
              <a href='#' className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
                <BurgerIcon type='primary' />
                <p className='ml-2 text text_type_main-default'>Конструктор</p>
              </a>
            </li>
            <li className={`ml-2 ${styles.item}`}>
              <a href='#' className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
                <ListIcon type='secondary' />
                <p className='ml-2 text text_type_main-default'>Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <nav className={`${styles.nav} ${styles.end}`}>
          <a href='#' className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
            <ProfileIcon type='secondary' />
            <p className='ml-2 text text_type_main-default'>Личный кабинет</p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
