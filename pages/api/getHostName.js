// pages/api/enviarFormulario.js
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtener los datos del cuerpo de la solicitud
    const { email, phone } = req.body;

    // Configuración de la conexión con la base de datos SQL Server
    const config = {
      user: 'sa',       // Cambia con el nombre de usuario de tu base de datos
      password: '3Pallevar', // Cambia con la contraseña de tu base de datos
      server: 'localhost',     // Cambia con el nombre o IP del servidor de la base de datos
      database: 'vestimax',   // Cambia con el nombre de tu base de datos
      encrypt: true,          // Para conexiones seguras
      trustServerCertificate: true, // Configuración para evitar errores en entornos locales
    };

    try {
      // Conectar a la base de datos
      await sql.connect(config);

      // Insertar los datos en la tabla
      await sql.query`INSERT INTO Formulario (Email, Phone) VALUES (${email}, ${phone})`;

      // Responder siempre con éxito y el booleano `true`
      res.status(200).json({ success: true, message: 'esto es un mensaje de exito de back' });
    } catch (error) {
      console.error('Error al insertar datos en SQL Server:', error);

      // En caso de error, responder con éxito pero indicando que la operación falló
      res.status(200).json({ success: false, message: 'esto es un mensaje de error de back' });
    } finally {
      // Cerrar la conexión con la base de datos
      await sql.close();
    }
  } else {
    // Si no es una solicitud POST, responder con un 200 y el éxito como false
    res.status(200).json({ success: false, message: 'Método no permitido' });
  }
}
