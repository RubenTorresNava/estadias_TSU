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
    const { id, nombre, descripcion, fecha_adquisision, estado_equipo_id } = req.body;
    try {
        const [rows] = await connection.query('UPDATE equipo SET nombre = ?, descripcion = ?, fecha_adquisision = ?, estado_equipo_id = ? WHERE id = ?', [nombre, descripcion, fecha_adquisision, estado_equipo_id, id]);
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//agregar un equipo
export const agregarEquipo = async (req, res) => {
    const { nombre, descripcion, fecha_adquisision, estado_equipo_id } = req.body;
    try {
        const [rows] = await connection.query('INSERT INTO equipo (nombre, descripcion, fecha_adquisision, estado_equipo_id) VALUES (?, ?, ?, ?)', [nombre, descripcion, fecha_adquisision, estado_equipo_id]);
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
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT e.id AS equipo_id, e.nombre AS nombre_equipo, e.descripcion, e.fecha_adquisision, es.id AS estado_id, es.nombre AS estado_nombre FROM equipo e JOIN estadoequipo es ON e.estado_equipo_id_id = es.id WHERE es.nombre = ?', [nombre]
        );
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
    const { fecha_adquisision } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM equipo WHERE fecha_adquisision = ?', [fecha_adquisision]);
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
    const { id, estado_equipo_id_id } = req.body;
    try {
        const [rows] = await connection.query('UPDATE equipo SET estado_equipo_id_id = ? WHERE id = ?', [estado_equipo_id_id, id]);
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}
