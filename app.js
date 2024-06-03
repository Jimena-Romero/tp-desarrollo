const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configura bodyParser para analizar los cuerpos de las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'registroclientes',
  password: 'hebe456',
  port: 5432,
});

// Maneja las solicitudes POST al endpoint '/guardar'
app.post('/guardar', (req, res) => {
  const { email, asunto, mensaje } = req.body;

  // Realiza una consulta SQL para insertar los datos en la tabla 'correos'
  const query = 'INSERT INTO correos (email, asunto, mensaje) VALUES ($1, $2, $3)';
  pool.query(query, [email, asunto, mensaje], (error, result) => {
    if (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).send('Error al guardar los datos');
    } else {
      console.log('Los datos se han guardado correctamente en la base de datos');
      res.send('Los datos se han guardado correctamente en la base de datos');
    }
  });
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
