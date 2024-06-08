import express from 'express';
import morgan from 'morgan';
import { connection } from './config/db.js';
import EmpleadosRoute from './routes/empleados.route.js';
import UsuariosRoute from './routes/usuarios.route.js';
import EquposRoute from './routes/equipo.route.js';
import EstadosRoute from './routes/estados.route.js';
import AsignacionesRoute from './routes/asignaciones.route.js';
import BitacoraRoute from './routes/bitacora.route.js';


const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use(express.json());
app.use(EmpleadosRoute);
app.use(UsuariosRoute);
app.use(EquposRoute);
app.use(EstadosRoute);
app.use(AsignacionesRoute);
app.use(BitacoraRoute);

 export default app;