import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";

const router = Router();

router.post("/bitacoras", bitacoraCtrl.agregarBitacora);
router.get("/bitacoras", bitacoraCtrl.obtenerBitacoras);
router.delete("/bitacoras", bitacoraCtrl.borrarBitacora);
router.put("/bitacoras", bitacoraCtrl.actualizarBitacora);
router.get("/bitacoras/equipo", bitacoraCtrl.obtenerBitacoraEquipo);
router.get("/bitacoras/usuario", bitacoraCtrl.obtenerBitacoraUsuario);
router.get("/bitacoras/fecha", bitacoraCtrl.obtenerBitacoraFecha);
router.get("/bitacoras/bitacora", bitacoraCtrl.obtenerBitacoraID);

export default router;