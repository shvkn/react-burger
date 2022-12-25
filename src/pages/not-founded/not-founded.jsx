import React from 'react';
import styles from '../page.module.css';

function NotFoundedPage() {
  return (
    <div className={styles.container}>
      <h1 className={'text text_type_main-large'}>404</h1>
      <h2 className={'text text_type_main-large'}>Запрашиваемая страница не найдена</h2>
    </div>
  );
}

export default NotFoundedPage;
