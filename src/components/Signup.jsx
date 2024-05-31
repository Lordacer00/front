import  { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Correo no es válido';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Contraseña es requerida';
        } else if (value.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres';
        }
        break;
      case 'repeatPassword':
        if (!value) {
          error = 'Confirmar contraseña es requerido';
        } else if (value !== password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      case 'firstName':
        if (!value) {
          error = 'Nombre es requerido';
        }
        break;
      case 'lastName':
        if (!value) {
          error = 'Apellido es requerido';
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        'http://localhost:1337/api/auth/local/register',
        {
          email,
          password,
          name: firstName,
          username: lastName,
        }
      );
      console.log(response.data);
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('username', lastName);
      localStorage.setItem('email', email);
      window.location.replace('/home');

      // Handle server response here, like redirecting user or showing success message
    } catch (error) {
      alert(error.response.data.error.message);
      console.error(
        'Error al registrarse:',
        error.response.data.error.message
      );

      // Handle errors here, like showing error message to user
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'Correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Correo no es válido';
    }
    if (!password) {
      validationErrors.password = 'Contraseña es requerida';
    } else if (password.length < 6) {
      validationErrors.password =
        'La contraseña debe tener al menos 6 caracteres';
    }
    if (!repeatPassword) {
      validationErrors.repeatPassword =
        'Confirmar contraseña es requerido';
    } else if (repeatPassword !== password) {
      validationErrors.repeatPassword =
        'Las contraseñas no coinciden';
    }
    if (!firstName) {
      validationErrors.firstName = 'Nombre es requerido';
    }
    if (!lastName) {
      validationErrors.lastName = 'Apellido es requerido';
    }

    return validationErrors;
  };

  return (
    <div className='signup-container'>
      <div>
        <h2>Regístrate</h2>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
            />
            <label htmlFor="floating_email" className="form-label">
              Correo
            </label>
            {errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className={`form-input ${
                errors.password ? 'error' : ''
              }`}
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) =>
                validateField('password', e.target.value)
              }
            />
            <label htmlFor="floating_password" className="form-label">
              Contraseña
            </label>
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="repeatPassword"
              id="floating_repeat_password"
              className={`form-input ${
                errors.repeatPassword ? 'error' : ''
              }`}
              placeholder=" "
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              onBlur={(e) =>
                validateField('repeatPassword', e.target.value)
              }
            />
            <label
              htmlFor="floating_repeat_password"
              className="form-label">
              Confirmar contraseña
            </label>
            {errors.repeatPassword && (
              <p className="error-text">{errors.repeatPassword}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              id="floating_first_name"
              className={`form-input ${
                errors.firstName ? 'error' : ''
              }`}
              placeholder=" "
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={(e) =>
                validateField('firstName', e.target.value)
              }
            />
            <label
              htmlFor="floating_first_name"
              className="form-label">
              Nombre
            </label>
            {errors.firstName && (
              <p className="error-text">{errors.firstName}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              id="floating_last_name"
              className={`form-input ${
                errors.lastName ? 'error' : ''
              }`}
              placeholder=" "
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={(e) =>
                validateField('lastName', e.target.value)
              }
            />
            <label
              htmlFor="floating_last_name"
              className="form-label">
              nickname
            </label>
            {errors.lastName && (
              <p className="error-text">{errors.lastName}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>

        <p className="form-footer">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="form-link">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
