import { Router } from "express";
import * as busquedasCtrl from "../controller/busquedas.controller.js";

const router = Router();

router.get('/busquedas/asignaciones', busquedasCtrl.busquedaAsignaciones);

export default router;