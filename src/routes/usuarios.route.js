import { Router } from 'express';
import * as usuariosCtrl from '../controller/usuarios.controller.js';

const router = Router();

router.post('/usuarios/login', usuariosCtrl.login);
router.post('/usuarios/register', usuariosCtrl.crearUsuario);
router.post('/usuarios/logout', usuariosCtrl.cerrarSesion);
router.put('/usuarios/upGradePass', usuariosCtrl.actualizarPassword);

export default router;