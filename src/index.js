import express from 'express';
import { connection } from './config/db.js';
import EmpleadosRoute from './routes/empleados.route.js';
import UsuariosRoute from './routes/usuarios.route.js';

const app = express();

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use(express.json());
app.use(EmpleadosRoute);
app.use(UsuariosRoute);

