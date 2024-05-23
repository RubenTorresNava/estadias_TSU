import { connection } from "../config/db.js";

//seleccionar todos los equipos
export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM equipo');
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar un equipo por id
export const obtenerEquipoID = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM equipo WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.json({ message: 'Equipo no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//borrar un equipo
export const borrarEquipo = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('DELETE FROM equipo WHERE id = ?', [id]);
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//actualizar un equipo
export const actualizarEquipo = async (req, res) => {
    const { id, nombre, descripcion, fecha_adquisision, estado_equipo } = req.body;
    try {
        const [rows] = await connection.query('UPDATE equipo SET nombre = ?, descripcion = ?, fecha_adquisision = ?, estado_equipo = ? WHERE id = ?', [nombre, descripcion, fecha_adquisision, estado_equipo, id]);
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//agregar un equipo
export const agregarEquipo = async (req, res) => {
    const { nombre, descripcion, fecha_adquisision, estado_equipo } = req.body;
    try {
        const [rows] = await connection.query('INSERT INTO equipo (nombre, descripcion, fecha_adquisision, estado_equipo) VALUES (?, ?, ?, ?)', [nombre, descripcion, fecha_adquisision, estado_equipo]);
        res.json({ message: 'Equipo agregado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//buscar un equipo por nombre
export const buscarEquipoNombre = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM equipo WHERE nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Equipo no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//buscar un equipo por estado
export const buscarEquipoEstado = async (req, res) => {
    const { estado } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM equipo WHERE estado_equipo = ?', [estado]);
        if (rows.length === 0) {
            res.json({ message: 'Equipo no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//buscar un equipo por fecha de adquisicion
export const buscarEquipoFecha = async (req, res) => {
    const { fecha } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM equipo WHERE fecha_adquisision = ?', [fecha]);
        if (rows.length === 0) {
            res.json({ message: 'Equipo no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//actualizar el estado de un equipo
export const actualizarEstado = async (req, res) => {
    const { id, estado_equipo } = req.body;
    try {
        const [rows] = await connection.query('UPDATE equipo SET estado_equipo = ? WHERE id = ?', [estado_equipo, id]);
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}
