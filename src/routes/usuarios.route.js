import { Router } from 'express';
import * as usuariosCtrl from '../controller/usuarios.controller.js';

const router = Router();

router.post('/usuarios/login', usuariosCtrl.login);
router.get('/usuarios/usuario', usuariosCtrl.obtenerUsuarioID)
router.get('/usuarios', usuariosCtrl.obtenerUsuarios);
router.delete('/usuarios', usuariosCtrl.borrarUsuario);
router.put('/usuarios', usuariosCtrl.actualizarUsuario);
router.post('/usuarios/register', usuariosCtrl.crearUsuario);

export default router;