import { Router } from "express";
import * as asignacionesCtrl from "../controller/asignaciones.controller.js";

const router = Router();

router.get('/asignaciones', asignacionesCtrl.obtenerAsignaciones);
router.post('/asignaciones', asignacionesCtrl.agregarAsignacion);
router.get('/asignaciones/asignacion', asignacionesCtrl.obtenerAsignacionID);
router.delete('/asignaciones/asignacion', asignacionesCtrl.borrarAsignacion);
router.put('/asignaciones/asignacion', asignacionesCtrl.actualizarAsignacion);
router.get('/asignaciones/empleado', asignacionesCtrl.obtenerAsignacionEmpleado);
router.get('/asignaciones/equipo', asignacionesCtrl.obtenerAsignacionEquipo);
router.get('/asignaciones/usuario', asignacionesCtrl.obtenerAsignacionUsuario);

export default router;  