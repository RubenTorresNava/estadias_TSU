import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";

const router = Router();

router.post("/bitacoras", bitacoraCtrl.agregarBitacora);
router.get("/bitacoras/:id", bitacoraCtrl.obtenerBitacoraIDURL);
router.get("/bitacoras", bitacoraCtrl.obtenerBitacoras);
router.put("/bitacoras/:id", bitacoraCtrl.actualizarBitacora);
router.delete("/bitacoras/:id", bitacoraCtrl.eliminarBitacora);

export default router;