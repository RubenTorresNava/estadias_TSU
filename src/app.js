import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connection } from './config/db.js';
import EmpleadosRoute from './routes/empleados.route.js';
import UsuariosRoute from './routes/usuarios.route.js';
import EquposRoute from './routes/equipo.route.js';
import EstadosRoute from './routes/estados.route.js';
import AsignacionesRoute from './routes/asignaciones.route.js';
import BitacoraRoute from './routes/bitacora.route.js';
import BusquedaRoute from './routes/busquedas.route.js';
/* import verifyToken from '../middleware/token.middleware.js';
 */
const app = express();
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

/* app.get('/usuarios', verifyToken, async (req, res) => {
    try {
      const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [req.userId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const user = rows[0];
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }); */

app.use(express.json());
app.use(EmpleadosRoute);
app.use(UsuariosRoute);
app.use(EquposRoute);
app.use(EstadosRoute);
app.use(AsignacionesRoute);
app.use(BitacoraRoute);
app.use(BusquedaRoute);

 export default app;