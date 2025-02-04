import React, { useState } from 'react';

const Host = () => {
  const [hostName, setHostName] = useState('');

  const fetchHostName = async () => {
    try {
      const response = await fetch('/api/getHostName');
      const data = await response.json();
      let hostName = data.hostName;
  
      // Si el nombre parece una IP interna, intenta obtener la IP pública
      if (hostName.startsWith('169.') || hostName.startsWith('172.')) {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        hostName = ipData.ip;
      }
  
      setHostName(hostName);
    } catch (error) {
      console.error('Error al obtener el nombre del equipo:', error);
    }
  };
  console.log('hostName:', hostName);

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
