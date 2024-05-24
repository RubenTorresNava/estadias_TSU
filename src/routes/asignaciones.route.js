import { Router } from "express";
import * as asignacionesCtrl from "../controller/asignaciones.controller.js";

const router = Router();

router.get('/asignaciones', asignacionesCtrl.obtenerAsignaciones);
router.post('/asignaciones', asignacionesCtrl.agregarAsignacion);
router.get('/asignaciones/asginacion', asignacionesCtrl.obtenerAsignacionID);
router.delete('/asignaciones/asignacion', asignacionesCtrl.borrarAsignacion);
router.put('/asignaciones/asignacion', asignacionesCtrl.actualizarAsignacion);

export default router;  