import React, { useEffect, useState } from 'react';
import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { RouterPaths } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserAuthorized } from '../utils/selectors';
import { login } from '../services/actions/auth';

function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthorized = useSelector(selectIsUserAuthorized);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandle = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuthorized) {
    return <Redirect to={location.state?.from || RouterPaths.BASE} />;
  }
  return (
    <div className={styles.container}>
      <form className={`mb-20`}>
        <h1 className={'text text_type_main-medium'}>Вход</h1>
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
        />
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={loginHandle}>
          Войти
        </Button>
      </form>
      <ul className={styles.links}>
        <li className={'mb-4'}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Вы новый пользователь?{' '}
            <Link to={RouterPaths.REGISTER} className={`${styles.link} colors-interface-accent`}>
              Зарегистрироваться
            </Link>
          </p>
        </li>
        <li>
          <p className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль?{' '}
            <Link
              to={RouterPaths.FORGOT_PASSWORD}
              className={`${styles.link} colors-interface-accent`}
            >
              Восстановить пароль
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default LoginPage;
