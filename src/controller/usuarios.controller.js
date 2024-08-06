import { connection } from '../config/db.js';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config.js';
    
//login de usuario usando jwt 
export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
               return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, {
            expiresIn: 60 * 60 * 24
        });
        //datos del usuario logueado
        console.log(rows);
        return res.status(200).json({ message: 'Usuario logueado', token: token });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }                       
}

//crear un usuario
export const crearUsuario = async (req, res) => {
    const { nombre  , email, password } = req.body;
    try {
        const [rows] = await connection.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password]);
        res.json({ message: 'Usuario creado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//cerrar sesion de usuario y eliminar token
export const cerrarSesion = async (req, res) =>  {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, 'secretkey', (error, decoded) => {
        if (error) {
            res.json({ message: error });
        }
        res.json({ message: 'Sesion cerrada' });
    });
}

//actualizar contraseña de usuario confirmando la contraseña actual
export const actualizarPassword = async (req, res) => {
    const { email, password, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Las contraseñas nuevas no coinciden' });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        await connection.query('UPDATE usuarios SET password = ? WHERE email = ?', [newPassword, email]);
        res.json({ message: 'Contraseña actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
        console.log(error);
    }
};

//obtener datos de usuario logueado
export const obtenerUsuario = async (req, res, verificarToken) => {
    try {
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = rows[0];
        res.status(200).json({ user });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }  
};