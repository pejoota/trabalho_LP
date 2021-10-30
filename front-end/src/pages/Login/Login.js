import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../logo.png';

import './Login.css';
import 'normalize.css';

//icons
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

//API
import { login } from '../../Utils/api';

function PagesLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showImage, setShowImage] = useState(false);

  const history = useHistory();

  const mandaRegistrar = () => {
    history.push('/register');
  };

  const mandaProBack = () => {
    login(email, password)
      .then((resp) => {
        const { data } = resp;
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('usrName', data.user.name);
          localStorage.setItem('id', data.user.id);
          localStorage.setItem('creator', data.user.creator);
          localStorage.setItem('answerer', data.user.answerer);
          localStorage.setItem('admin', data.user.admin);
          history.push('/home');
        }
      })
      .catch((err) => {
        alert('Email e/ou senha inválidos');
        console.log('ERRO:', err);
      });
  };

  const handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    setShowImage(!showImage);
  };

  return (
    <div className="back">
      <div className="login">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="login-right">
          <h1>Acessar App</h1>
          <div className="loginInputEmail">
            <MailIcon />
            <input
              type="email"
              placeholder="Digite um email"
              value={email}
              onChange={(clickEvent) => setEmail(clickEvent.target.value)}
            />
          </div>

          <div className="loginInputPassword">
            <LockIcon />
            <input
              type={showImage ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-eye">
              {showImage ? (
                <VisibilityIcon onClick={handleClick} />
              ) : (
                <VisibilityOffIcon onClick={handleClick} />
              )}
            </div>
          </div>

          <div>
            <button onClick={mandaProBack} className="submitButton">
              Entrar
            </button>
          </div>
          <div>
            <h4>Não tenho conta</h4>
          </div>
          <div>
            <button onClick={mandaRegistrar} className="submitButton">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagesLogin;
