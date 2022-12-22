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
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={`p-4 ${styles.header}`}>
      <div className={`${styles.container}`}>
        <nav className={styles.nav}>
          <ul className={styles.items}>
            <li className={styles.item}>
              <Link to={'/'} className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
                <BurgerIcon type='primary' />
                <p className='ml-2 text text_type_main-default'>Конструктор</p>
              </Link>
            </li>
            <li className={`ml-2 ${styles.item}`}>
              <Link to={'/'} className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
                <ListIcon type='secondary' />
                <p className='ml-2 text text_type_main-default text_color_inactive'>
                  Лента заказов
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <Logo />
        <nav className={`${styles.nav} ${styles.end}`}>
          <Link to={'/profile'} className={`pt-4 pl-5 pb-4 pr-5 ${styles.link}`}>
            <ProfileIcon type='secondary' />
            <p className='ml-2 text text_type_main-default text_color_inactive'>Личный кабинет</p>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
