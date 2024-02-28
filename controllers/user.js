import {db} from '../db.js'

//GET para consultar y leer a los usuarios
export const getUsers = (_, res) => {
  const getQuery = "SELECT `id`,`name_user`, `email`, `password_user` FROM users";

  db.query(getQuery, (error, data) => {
    if (error) {
      console.error("Error al recuperar usuarios:", error);
      return res.status(500).json({ error: "Error interno del servidor." }); //500 Error interno de servidor.
    }

    return res.status(200).json(data); //200 Indica que la solicitud ha tenido éxito.
  });
};

//POST para crear el usuario
export const postUser = (req, res) => {

  const postQuery = "INSERT INTO users(`name_user`, `email`, `password_user`) VALUES(?, ?, ?)";

  const values = [
    req.body.name_user,
    req.body.email,
    req.body.password_user,
  ];

  db.query(postQuery, values, (error) => {
    if (error) {
      console.error("Error al insertar el usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor." }); //500 Error interno de servidor.
    }

    return res.status(201).json("Usuario creado con éxito."); //201 indica que la solicitud ha tenido éxito y ha llevado a la creación de un recurso.
  });
};


export const buscarEmail = (req, res) => {
  const buscarEmailQuery = "SELECT COUNT(*) as count FROM users WHERE `email` = ?"; //La COUNT(*) nos permite contar el número de filas en una tabla.
    
    const values = [
      req.body.email,
    ];
  
    db.query(buscarEmailQuery, values, (error, results) => {
      if (error) {
        console.error("Error al verificar el correo:", error);
        return res.status(500).json({ error: "Error interno del servidor." }); //500 Error interno de servidor.
      }
  
      const userCount = results[0].count;
  
      if (userCount > 0) {
        return res.status(200).json({ message: "El correo ya está registrado." }); //200 Indica que la solicitud ha tenido éxito.
      }else {
        return res.status(200).json({ message: "El correo no está registrado." }); //200 Indica que la solicitud ha tenido éxito.
      }
    });
  };  

//Para buscar y validar el inicio de sesion del usuario
export const loginUser = (req, res) => {
  const selectQuery = "SELECT * FROM users WHERE `email` = ?";

  const values = [
    req.body.email,
  ];

  db.query(selectQuery, values, (error, results) => {
    if (error) {
      console.error("Error al recuperar el usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor." }); //500 Error interno de servidor.
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." }); //404 No se encontro.
    }

    const user = results[0];

    if (user.Contraseña !== req.body.Contraseña) {
      return res.status(401).json({ error: "Credenciales inválidas." }); //401 carece de credenciales válidas de autenticación para el recurso solicitado.
    }
    
    return res.status(200).json("Usuario encontrado, bienvenido"); //200 Indica que la solicitud ha tenido éxito.
  });
};