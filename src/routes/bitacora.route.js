import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";
import verificarToken from "../middleware/token.middleware.js";

const router = Router();

router.get('/bitacoras', verificarToken, bitacoraCtrl.obtenerBitacoras);
router.get('/bitacoras/:id', verificarToken, bitacoraCtrl.obtenerBitacoraIDURL);
router.put('/bitacoras/:id', verificarToken, bitacoraCtrl.actualizarBitacoraIDURL);
router.delete('/bitacoras/:id', verificarToken, bitacoraCtrl.eliminarBitacoraIDURL);
router.post('/bitacoras', verificarToken, bitacoraCtrl.crearBitacora);

export default router;