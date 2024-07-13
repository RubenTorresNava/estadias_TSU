import { Router } from "express";
import * as empleadosCtrl from "../controller/empleados.controller.js";

const router = Router();

router.post('/empleados', empleadosCtrl.insertarEmpleado);
router.get('/empleados', empleadosCtrl.obtenerEmpleados);
router.get('/empleados/:id', empleadosCtrl.obtenerEmpleadoIDURL);
router.put('/empleados/:id', empleadosCtrl.actualizarEmpleado);
export default router;