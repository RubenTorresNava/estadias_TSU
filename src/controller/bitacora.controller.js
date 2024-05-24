import { connection } from "../config/db";

//seleccionar todas las bitacoras
export const obtenerBitacoras = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id');
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//agregar una bitacora
export const agregarBitacora = async (req, res) => {
    const { fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;
    try {
        const [rows] = await connection.query('INSERT INTO bitacora (fecha, descripcion, id_usuario, id_equipo, id_asignacion) VALUES (?, ?, ?, ?, ?)', [fecha, descripcion, id_usuario, id_equipo, id_asignacion]);
        res.json({ message: 'Bitacora agregada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una bitacora por nombre del equipo
export const obtenerBitacoraEquipo = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id WHERE e.nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Bitacora no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una bitacora por nombre del usuario
export const obtenerBitacoraUsuario = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id WHERE u.nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Bitacora no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una bitacora por fecha
export const obtenerBitacoraFecha = async (req, res) => {
    const { fecha } = req.body;
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id WHERE b.fecha = ?', [fecha]);
        if (rows.length === 0) {
            res.json({ message: 'Bitacora no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//borrar una bitacora
export const borrarBitacora = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('DELETE FROM bitacora WHERE id = ?', [id]);
        res.json({ message: 'Bitacora eliminada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//actualizar una bitacora
export const actualizarBitacora = async (req, res) => {
    const { id, fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;
    try {
        const [rows] = await connection.query('UPDATE bitacora SET fecha = ?, descripcion = ?, id_usuario = ?, id_equipo = ?, id_asignacion = ? WHERE id = ?', [fecha, descripcion, id_usuario, id_equipo, id_asignacion, id]);
        res.json({ message: 'Bitacora actualizada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una bitacora por id
export const obtenerBitacoraID = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id WHERE b.id = ?', [id]);
        if (rows.length === 0) {
            res.json({ message: 'Bitacora no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}