import { Router } from 'express';
import * as usuariosCtrl from '../controller/usuarios.controller.js';
import verificarToken from '../middleware/token.middleware.js';

const router = Router();

router.post('/usuarios/login', usuariosCtrl.login);
router.post('/usuarios/register', usuariosCtrl.crearUsuario);
router.post('/usuarios/logout', verificarToken, usuariosCtrl.cerrarSesion);
router.put('/usuarios/upGradePass', verificarToken, usuariosCtrl.actualizarPassword);
router.get('/usuarios', verificarToken, usuariosCtrl.obtenerUsuario);
export default router;