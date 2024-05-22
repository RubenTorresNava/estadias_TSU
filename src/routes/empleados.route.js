import { Router } from "express";
import * as empleadosCtrl from "../controller/empleados.controller.js";

const router = Router();

router.post('/empleados', empleadosCtrl.insertarEmpleado);
router.get('/empleados', empleadosCtrl.obtenerEmpleados);
router.get('/empleados/empleado', empleadosCtrl.obtenerEmpleadoID);
router.delete('/empleados/borrar', empleadosCtrl.borrarEmpleado);
router.put('/empleados/actualizar', empleadosCtrl.actualizarEmpleado);
export default router;