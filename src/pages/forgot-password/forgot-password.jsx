import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { RouterPaths } from '../../utils/constants';
import { getResetCodeRequest } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserAuthorized } from '../../utils/selectors';
import { getUser } from '../../services/actions/auth';

function ForgotPasswordPage(props) {
  const [form, setValue] = useState({ email: '' });
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsUserAuthorized);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const getResetCode = (e) => {
    e.preventDefault();
    getResetCodeRequest(form).then(({ success }) => {
      if (success) {
        history.replace({
          pathname: RouterPaths.RESET_PASSWORD,
          state: { from: history.location },
        });
      }
    });
  };

  return isAuthorized ? (
    <Redirect to={RouterPaths.BASE} />
  ) : (
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
        <Link to={RouterPaths.LOGIN} className={`${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ForgotPasswordPage;
