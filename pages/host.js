import React, { useState } from 'react';

const Host = () => {
  const [hostName, setHostName] = useState('');

  const fetchHostName = async () => {
    try {
      const response = await fetch('/api/getHostName'); // Asegúrate de que este sea el endpoint correcto
      const data = await response.json();
      setHostName(data.hostName);
    } catch (error) {
      console.error('Error al obtener el nombre del equipo:', error);
    }
  };

  return (
    <div>
      <button 
        style={{ backgroundColor: 'red', color: 'white' }} 
        onClick={fetchHostName}
      >
        Nombre del equipo
      </button>
      {hostName && <p>{hostName}</p>}
    </div>
  );
};

export default Host;
