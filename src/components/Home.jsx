import React from 'react';
import './App.css';

const Home = () => {
  const handleClearLocalStorage = () => {
    // Elimina los elementos del local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    // Opcionalmente, puedes actualizar el estado o realizar cualquier otra acción necesaria
    console.log('Local storage cleared');
    window.location.replace('/login');
  };

  return (  
    <div className="home-container">
      <h1>Bienvenido <span>{localStorage.getItem("username")}</span></h1>
      <br />
      <h2>Te registraste con el correo {localStorage.getItem("email")}</h2>
      <div className="stats">
        <h3>Estadísticas del Juego</h3>
        <p>Puntaje: <span id="score">0</span></p>
        <p>Retroalimentación: <span id="feedback">N/A</span></p>
      </div>
      <button onClick={handleClearLocalStorage} className="logout-button">Cerrar sesión</button>
    </div>
  );
};

export default Home;
