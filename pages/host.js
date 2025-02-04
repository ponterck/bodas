import React, { useState } from 'react';

const Host = () => {
  const [hostInfo, setHostInfo] = useState({});

  const fetchHostInfo = () => {
    const info = {
      plataforma: navigator.platform,
      userAgent: navigator.userAgent,
      memoria: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'No disponible',
      núcleosCPU: navigator.hardwareConcurrency || 'No disponible',
    };

    setHostInfo(info);
  };

  return (
    <div>
      <button 
        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} 
        onClick={fetchHostInfo}
      >
        Obtener información del equipo
      </button>

      {Object.keys(hostInfo).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Plataforma:</strong> {hostInfo.plataforma}</p>
          <p><strong>Agente de usuario:</strong> {hostInfo.userAgent}</p>
          <p><strong>Memoria:</strong> {hostInfo.memoria}</p>
          <p><strong>Núcleos de CPU:</strong> {hostInfo.núcleosCPU}</p>
        </div>
      )}
    </div>
  );
};

export default Host;
