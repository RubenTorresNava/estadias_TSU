import { Router } from "express";
import * as empleadosCtrl from "../controller/empleados.controller.js";
import verificarToken from "../middleware/token.middleware.js";
const router = Router();

router.post('/empleados', empleadosCtrl.insertarEmpleado);
router.get('/empleados', verificarToken, empleadosCtrl.obtenerEmpleados);
router.get('/empleados/:id', empleadosCtrl.obtenerEmpleadoIDURL);
router.put('/empleados/:id', empleadosCtrl.actualizarEmpleado);
router.delete('/empleados/:id', empleadosCtrl.eliminarEmpleado);

export default router;