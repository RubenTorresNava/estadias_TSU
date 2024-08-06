import { Router } from "express";
import * as empleadosCtrl from "../controller/empleados.controller.js";
import verificarToken from "../middleware/token.middleware.js";
const router = Router();

router.post('/empleados', verificarToken, empleadosCtrl.insertarEmpleado);
router.get('/empleados', verificarToken, empleadosCtrl.obtenerEmpleados);
router.get('/empleados/:id', verificarToken, empleadosCtrl.obtenerEmpleadoIDURL);
router.put('/empleados/:id', verificarToken, empleadosCtrl.actualizarEmpleado);
router.delete('/empleados/:id', verificarToken, empleadosCtrl.eliminarEmpleado);

export default router;