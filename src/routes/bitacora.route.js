import { Router } from "express";
import * as bitacoraCtrl from "../controller/bitacora.controller.js";

const router = Router();

router.post("bitacora", bitacoraCtrl.agregarBitacora);
router.get("bitacora", bitacoraCtrl.obtenerBitacoras);
router.delete("bitacora", bitacoraCtrl.borrarBitacora);
router.put("bitacora", bitacoraCtrl.actualizarBitacora);
router.get("bitacora/equipo", bitacoraCtrl.obtenerBitacoraEquipo);
router.get("bitacora/usuario", bitacoraCtrl.obtenerBitacoraUsuario);
router.get("bitacora/fecha", bitacoraCtrl.obtenerBitacoraFecha);
router.get("bitacora/id", bitacoraCtrl.obtenerBitacoraID);

export default router;