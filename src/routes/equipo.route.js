import { Router } from 'express';
import * as EquipoController from '../controller/equipo.controller.js';
import verificarToken from '../middleware/token.middleware.js';

const router = Router();

router.get('/equipos', verificarToken, EquipoController.obtenerEquipos);
router.get('/equipos/:id', EquipoController.obtenerEquipo);
router.post('/equipos', EquipoController.agregarEquipo);
router.put('/equipos/:id', EquipoController.actualizarEquipo);
router.delete('/equipos/:id', EquipoController.eliminarEquipo);

export default router;