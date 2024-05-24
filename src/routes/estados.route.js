import { Router } from "express";
import * as estadosCtrl from "../controller/estados.controller.js";

const router = Router();

router.get('/estados', estadosCtrl.obtenerEstados);
router.get('/estados/estado', estadosCtrl.obtenerEstadoID);

export default router;