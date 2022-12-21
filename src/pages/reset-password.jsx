import React, { useState } from 'react';
import styles from './page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../utils/constants';
import { resetPasswordRequest } from '../utils/burger-api';

function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const resetPassword = (e) => {
    e.preventDefault();
    resetPasswordRequest(form).then(({ success }) => {
      if (success) {
        history.replace({ pathname: Routes.BASE });
      }
    });
  };
  return (
    <div className={styles.container}>
      <form className={`mb-20`}>
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Введите новый пароль'}
        />
        <Input
          extraClass={'mt-6 mb-6'}
          name={'token'}
          value={form.token}
          onChange={onChange}
          placeholder={'Введите код из письма'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={resetPassword}>
          Сохранить
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

export default ResetPasswordPage;
