import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:1337/api/auth/local',
        {
          identifier: email,
          password,
        }
      );
      console.log(response.data);
      // Maneja la respuesta del servidor aquí, como redirigir al usuario o mostrar un mensaje de éxito
      console.log('inicio correcto');
      window.location.replace('/home');
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
    } catch (error) {
      console.error('Error al iniciar sesion:', error);
      alert(error.response.data.error.message);

      // Maneja los errores aquí, como mostrar un mensaje de error al usuario
    }
  };
  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2 className="form-title">Iniciar Sesion</h2>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="form-input"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email" className="form-label">
              Correo
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="form-input"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password" className="form-label">
              Contraseña
            </label>
          </div>
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>

        <p className="form-footer">
          No tienes cuenta?{' '}
          <a href="/Signup" className="form-link">
            regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
