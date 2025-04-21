import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FormularioConValidacion = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorficticio, setErrorficticio] = useState('');
  const [succesficticio, setSuccesficticio] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Función para validar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validación de email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validación de teléfono
    if (!phone || phone.length < 10) {
      setPhoneError('El teléfono debe tener al menos 10 dígitos');
      valid = false;
    } else {
      setPhoneError('');
    }

    // Si la validación es exitosa, hacer la solicitud al backend
    if (valid) {
      try {
        const response = await fetch('/api/getHostName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, phone }),
        });

        const data = await response.json();

        // Asignar el mensaje de éxito o error basado en la respuesta del backend
        if (data.success) {
          setSuccesficticio(data.message); // Establecer mensaje de éxito
          Swal.fire({
            title: '¡Éxito!',
            text: data.message, // Mostrar mensaje del backend
            icon: 'success',
            confirmButtonText: 'cerrar',
            customClass: {
              popup: 'swal-popup-succes', // Clase personalizada para el popup
              confirmButton: 'swal-confirm-button', // Clase personalizada para el botón
              title: 'swal-title', 
            },
          });
        } else {
          setErrorficticio(data.message); // Establecer mensaje de error
          Swal.fire({
            title: '¡Error!',
            text: data.message, // Mostrar mensaje del backend
            icon: 'error',
            confirmButtonText: 'volver a intentar',
            customClass: {
              popup: 'swal-popup-error', // Clase personalizada para el popup
              confirmButton: 'swal-confirm-button', // Clase personalizada para el botón
              title: 'swal-title', 
            },
          });
        }
      } catch (error) {
        console.error('Error al enviar formulario:', error);
        setErrorficticio('Hubo un problema al enviar el formulario. Intenta nuevamente.');
        Swal.fire({
          title: '¡Error!',
          text: 'error desconocido', // Mostrar mensaje de error genérico
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label htmlFor="email" className="block">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block">Teléfono</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border"
        />
        {phoneError && <p className="text-red-500">{phoneError}</p>}
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white">Enviar</button>
    </form>
  );
};

export default FormularioConValidacion;
