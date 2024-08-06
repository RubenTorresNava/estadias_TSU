import { Router } from 'express';
import * as EquipoController from '../controller/equipo.controller.js';
import verificarToken from '../middleware/token.middleware.js';

const router = Router();

router.get('/equipos', verificarToken, EquipoController.obtenerEquipos);
router.get('/equipos/:id', verificarToken, EquipoController.obtenerEquipo);
router.post('/equipos', verificarToken, EquipoController.agregarEquipo);
router.put('/equipos/:id', verificarToken, EquipoController.actualizarEquipo);
router.delete('/equipos/:id', verificarToken, EquipoController.eliminarEquipo);

export default router;