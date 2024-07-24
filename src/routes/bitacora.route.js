import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";

const router = Router();

router.get('/bitacoras', bitacoraCtrl.obtenerBitacoras);
router.get('/bitacoras/:id', bitacoraCtrl.obtenerBitacoraIDURL);
router.put('/bitacoras/:id', bitacoraCtrl.actualizarBitacoraIDURL);
router.delete('/bitacoras/:id', bitacoraCtrl.eliminarBitacoraIDURL);
router.post('/bitacoras', bitacoraCtrl.crearBitacora);

export default router;