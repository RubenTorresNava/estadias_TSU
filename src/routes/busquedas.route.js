import { Router } from "express";
import * as busquedasCtrl from "../controller/busquedas.controller.js";

const router = Router();

router.get('/busquedas/asignaciones', busquedasCtrl.busquedaAsignaciones);
router.get('/busquedas/equipos', busquedasCtrl.busquedaEquipos);
router.get('/busquedas/empleados', busquedasCtrl.busquedaEmpleados);


export default router;