import { Router } from 'express';
import * as EquipoController from '../controller/equipo.controller.js';

const router = Router();

router.get('/equipos', EquipoController.obtenerEquipos);
router.get('/equipos/equipo', EquipoController.obtenerEquipoID);
router.delete('/equipos/equipo', EquipoController.borrarEquipo);
router.put('/equipos', EquipoController.actualizarEquipo);
router.post('/equipos', EquipoController.agregarEquipo);
router.get('/equipos/estado', EquipoController.buscarEquipoEstado);
router.get('/equipos/fecha', EquipoController.buscarEquipoFecha);
router.put('/equipos/estado', EquipoController.actualizarEstado);
router.get('equipos/nombre', EquipoController.buscarEquipoNombre);

export default router;