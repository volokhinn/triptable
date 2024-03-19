import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchTrips } from '../../redux/slices/tripsSlice';

import styles from './AuthWindow.module.scss';

import logo from '../../img/iway.svg';

const AuthWindow = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ login: username, password: password })).then((result) => {
      if (login.fulfilled.match(result)) {
        const token = result.payload.result.token;
        localStorage.setItem('token', token);
        console.log(token);

        if (token) {
          dispatch(fetchTrips(token)).then(() => {
            navigate('/trips');
          });
        }
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
      <div className={`${styles.inputs} ${error && styles.errorinputs}`}>
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
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default AuthWindow;
