import React, { useState } from 'react';
import styles from './page.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { RouterPaths } from '../utils/constants';
import { getResetCodeRequest } from '../utils/burger-api';

function ForgotPasswordPage(props) {
  const [form, setValue] = useState({ email: '' });
  const history = useHistory();
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const getResetCode = (e) => {
    e.preventDefault();
    getResetCodeRequest(form).then(({ success }) => {
      if (success) {
        history.replace({ pathname: RouterPaths.RESET_PASSWORD });
      }
    });
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
          placeholder={'E-mail'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'} onClick={getResetCode}>
          Восстановить
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Вспомнили пароль?{' '}
        <Link to={RouterPaths.LOGIN} className={`${styles.link} colors-interface-accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ForgotPasswordPage;
