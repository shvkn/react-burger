import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { NavLink, Route } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { RouterPaths } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors';
import { logout, patchUser } from '../../services/actions/auth';

function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const user = useSelector(selectUser);

  const isFormChanged = user?.name !== form.name || user?.email !== form.email;

  useEffect(() => {
    setForm({ name: user.name, email: user.email, password: '' });
  }, [user]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetChanges = (e) => {
    e.preventDefault();
    setForm({ name: user.name, email: user.email, password: '' });
  };

  const dispatch = useDispatch();

  const patchUserData = (e) => {
    e.preventDefault();
    dispatch(patchUser(form));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul className={styles.links}>
          <li className={'pt-4 pb-4'}>
            <NavLink
              to={RouterPaths.PROFILE}
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li className={'pt-4 pb-4'}>
            <NavLink
              to={RouterPaths.ORDERS_HISTORY}
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
            >
              Заказы
            </NavLink>
          </li>
          <li className={'pt-4 pb-4'}>
            <NavLink
              to={RouterPaths.LOGOUT}
              className={(isActive) => {
                return `${styles.link} text text_type_main-medium ${
                  isActive ? 'text_color_primary' : 'text_color_inactive'
                }`;
              }}
              onClick={() => dispatch(logout())}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          <Route exact path={RouterPaths.PROFILE}>
            В этом разделе вы можете изменить свои персональные данные
          </Route>
          <Route exact path={RouterPaths.ORDERS_HISTORY}>
            В этом разделе вы можете просмотреть свою историю заказов
          </Route>
        </p>
      </div>
      <div className={`ml-15`}>
        <Route exact path={RouterPaths.PROFILE}>
          <Input
            value={form.name}
            name={'name'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'EditIcon'}
          />
          <EmailInput
            value={form.email}
            name={'email'}
            placeholder={'E-mail'}
            onChange={onChange}
            icon={'EditIcon'}
            extraClass={'mt-6'}
          />
          <PasswordInput
            value={form.password}
            name={'password'}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'EditIcon'}
            extraClass={'mt-6'}
          />
          <div className={`mt-10 ${styles.buttons}`}>
            <Button htmlType={'button'} disabled={!isFormChanged} onClick={patchUserData}>
              Сохранить
            </Button>

            <Button
              htmlType={'button'}
              disabled={!isFormChanged}
              onClick={resetChanges}
              extraClass={'ml-4'}
            >
              Отменить
            </Button>
          </div>
        </Route>
        <Route exact path={RouterPaths.ORDERS_HISTORY}>
          В этом разделе вы можете просмотреть свою историю заказов
        </Route>
      </div>
    </div>
  );
}

export default ProfilePage;
