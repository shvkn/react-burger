import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { Route } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Tab from '../components/tab/tab';
import { RouterPaths } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserAuthorized, selectUser } from '../utils/selectors';
import { getUser, patchUser } from '../services/actions/auth';

function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const isAuthorized = useSelector(selectIsUserAuthorized);
  const user = useSelector(selectUser);

  const isFormChanged = user?.name !== form.name || user?.email !== form.email;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fillForm = () => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
  };

  const resetChanges = (e) => {
    e.preventDefault();
    fillForm();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fillForm();
  }, [user]);

  const patchUserData = (e) => {
    e.preventDefault();
    dispatch(patchUser(form));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul className={styles.links}>
          <li>
            <Tab title={'Профиль'} exact to={RouterPaths.PROFILE} />
          </li>
          <li>
            <Tab title={'Заказы'} exact to={RouterPaths.ORDERS_HISTORY} />
          </li>
          <li>
            <Tab title={'Выход'} exact to={RouterPaths.LOGOUT} />
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
