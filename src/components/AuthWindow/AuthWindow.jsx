import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

import styles from './AuthWindow.module.scss';

import logo from '../../img/iway.svg';

const LoginWindow = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ login: username, password: password })).then((result) => {
      if (login.fulfilled.match(result)) {
        console.log(result.payload.result.token);
      } else if (login.rejected.match(result)) {
        const payload = result.payload;
        if (payload.error && payload.error.message) {
          setError(payload.error.message);
        }
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="iway" />
      <h1 className={styles.title}>Авторизация</h1>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.btn} onClick={handleLogin}>
        Войти
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default LoginWindow;
