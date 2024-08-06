import { Router } from "express";
import * as busquedasCtrl from "../controller/busquedas.controller.js";
import verificarToken from "../middleware/token.middleware.js";

const router = Router();

router.get('/busquedas/asignaciones', verificarToken, busquedasCtrl.busquedaAsignaciones);
router.get('/busquedas/equipos', verificarToken, busquedasCtrl.busquedaEquipos);
router.get('/busquedas/empleados', verificarToken, busquedasCtrl.busquedaEmpleados);


export default router;