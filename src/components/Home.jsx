import React from 'react';

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

  return <button onClick={handleClearLocalStorage}>Salir</button>;
};

export default Home;
