import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";
import verificarToken from "../middleware/token.middleware.js";

const router = Router();

router.get('/bitacoras', verificarToken, bitacoraCtrl.obtenerBitacoras);
router.get('/bitacoras/:id', bitacoraCtrl.obtenerBitacoraIDURL);
router.put('/bitacoras/:id', bitacoraCtrl.actualizarBitacoraIDURL);
router.delete('/bitacoras/:id', bitacoraCtrl.eliminarBitacoraIDURL);
router.post('/bitacoras', bitacoraCtrl.crearBitacora);

export default router;