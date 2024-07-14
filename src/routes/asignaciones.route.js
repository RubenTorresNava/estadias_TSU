import { Router } from "express";
import * as asignacionesCtrl from "../controller/asignaciones.controller.js";

const router = Router();

router.get('/asignaciones', asignacionesCtrl.obtenerAsignaciones);
router.post('/asignaciones', asignacionesCtrl.agregarAsignacion);
router.delete('/asignaciones/:id', asignacionesCtrl.borrarAsignacion);
router.put('/asignaciones/:id', asignacionesCtrl.actualizarAsignacionIDURL);
router.get('/asignaciones/:id', asignacionesCtrl.obtenerAsignacionIDURL);

export default router;  