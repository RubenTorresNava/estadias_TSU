import { connection } from '../config/db.js';

//login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            res.json({ message: 'Usuario encontrado' });
        } else {
            res.json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar un usuario por id
export const obtenerUsuarioID = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.json({ message: 'Usuario no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//borrar un usuario
export const borrarUsuario = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    const { id,nombre, email, password } = req.body;
    try {
        const [rows] = await connection.query('UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?', [nombre, email, password, id]);
        res.json({ message: 'Usuario actualizado' });
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