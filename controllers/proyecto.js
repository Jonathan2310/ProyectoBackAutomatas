import { db } from '../db.js';

// GET para obtener los datos de los usuarios
export const getClientes = (req, res) => { // Suponiendo que tienes un middleware para obtener el usuario actual

  const selectQuery = `SELECT * FROM clientes`;

  // Ejecuta la consulta para obtener las tareas del usuario de la base de datos
  db.query(selectQuery, (error, clientes) => {
    if (error) {
      console.error("Error al obtener los clientes:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }

    return res.status(200).json(clientes); // Devuelve un objeto JSON con la lista de datos de los usuarios
  });
};

//realizar la busqueda por el nombre
export const search = (req, res) => {

  const searchQuery = `SELECT * FROM clientes WHERE TRIM(nombre) = ? OR telefono = ?`;

  const values = [
    req.body.nombre,
    req.body.telefono
  ];

  db.query(searchQuery, values, (error, resultado) => {
    if (error) {
      console.error("Error al buscar nombre del cliente:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    
    return res.status(200).json(resultado);
  });
};

//realizar la busqueda por el telefono
export const searchTelefono = (req, res) => {

  const searchQuery = `SELECT * FROM clientes WHERE telefono = ?`;

  const values = [req.body.telefono];

  db.query(searchQuery, values, (error, resultado) => {
    if (error) {
      console.error("Error al buscar nombre del cliente:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    
    return res.status(200).json(resultado);
  });
};