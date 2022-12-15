import React, { useState } from 'react';
import styles from './page.module.css';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Routes } from '../utils/constants';

function ForgotPasswordPage(props) {
  const [form, setValue] = useState({ email: '' });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={`mb-20`}>
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Восстановить
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль?{' '}
        <Link to={Routes.LOGIN} className={`${styles.link} colors-interface-accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ForgotPasswordPage;
