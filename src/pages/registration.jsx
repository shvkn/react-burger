import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { RouterPaths } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, registerUser } from '../services/actions/auth';

function RegistrationPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };
  const history = useHistory();
  if (user) {
    history.goBack();
  }
  return (
    <div className={styles.container}>
      <form className={`mb-20`}>
        <h1 className={'text text_type_main-medium'}>Регистрация</h1>
        <Input
          extraClass={'mt-6 mb-6'}
          name={'name'}
          value={form.name}
          onChange={onChange}
          placeholder={'Имя'}
        />
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
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={register}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированны?{' '}
        <Link to={RouterPaths.LOGIN} className={`${styles.link} colors-interface-accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
