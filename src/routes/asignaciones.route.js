import { Router } from "express";
import * as asignacionesCtrl from "../controller/asignaciones.controller.js";
import verificarToken from "../middleware/token.middleware.js";

const router = Router();

router.get('/asignaciones', verificarToken, asignacionesCtrl.obtenerAsignaciones);
router.post('/asignaciones', verificarToken, asignacionesCtrl.agregarAsignacion);
router.delete('/asignaciones/:id', verificarToken, asignacionesCtrl.borrarAsignacion);
router.put('/asignaciones/:id', verificarToken, asignacionesCtrl.actualizarAsignacionIDURL);
router.get('/asignaciones/:id', verificarToken, asignacionesCtrl.obtenerAsignacionIDURL);

export default router;  