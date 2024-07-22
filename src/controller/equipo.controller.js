import { connection } from "../config/db.js";
import { format, parse } from "date-fns";


//seleccionar todos los equipos y el estado de cada uno
export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await connection.query(`
            SELECT 
            e.id,
            e.nombre,
            e.descripcion,
            e.fecha_adquisision,
            es.nombre AS estado_nombre
            FROM 
            equipo e
            JOIN 
            estadoequipo es ON e.estado_equipo_id = es.id;
        `);
        rows.forEach((row) => {
            row.fecha_adquisision = format(new Date(row.fecha_adquisision), 'dd-MM-yyyy');
        });
        return res.json(rows);
    } catch (error) {
        return res.json({ message: error });
    }
}

//seleccionar un equipo por su id
export const obtenerEquipo = async (req, res) => {
    try {
        const [rows] = await connection.query(`
            SELECT 
            e.id,
            e.nombre,
            e.descripcion,
            e.fecha_adquisision,
            es.nombre AS estado_nombre
            FROM 
            equipo e
            JOIN 
            estadoequipo es ON e.estado_equipo_id = es.id
            WHERE 
            e.id = ?;
        `, [req.params.id]);
        rows.forEach((row) => {
            row.fecha_adquisision = format(new Date(row.fecha_adquisision), 'dd-MM-yyyy');
        });
        return res.json(rows);
    } catch (error) {
        return res.json({ message: error });
    }
}

//agregar un equipo
        export const agregarEquipo = async (req, res) => {
            const { nombre, descripcion, fecha_adquisision } = req.body;

            // Convertir fecha de dd-MM-yyyy a yyyy-MM-dd
            let fechaSQL;
            try {
                fechaSQL = format(parse(fecha_adquisision, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
            } catch (error) {
                return res.status(400).json({ message: 'Formato de fecha inválido' });
            }

            try {
                const [rows] = await connection.query('INSERT INTO equipo (nombre, descripcion, fecha_adquisision) VALUES (?, ?, ?)', [nombre, descripcion, fechaSQL]);
                return res.json({ message: 'Equipo agregado' });
            } catch (error) {
                return res.json({ message: error });
            }
        }

//actualizar un equipo desde su url
export const actualizarEquipo = async (req, res) => {
    const { nombre, descripcion, fecha_adquisision, estado_equipo_id } = req.body;

    // Convertir fecha de dd-MM-yyyy a yyyy-MM-dd
    let fechaSQL;
    try {
        fechaSQL = format(parse(fecha_adquisision, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
    } catch (error) {
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }

    try {
        const [rows] = await connection.query('UPDATE equipo SET nombre = ?, descripcion = ?, fecha_adquisision = ?, estado_equipo_id = ? WHERE id = ?', [nombre, descripcion, fechaSQL, estado_equipo_id, req.params.id]);
        return res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        return res.json({ message: error });
    }
}

//eliminar un equipo desde su url
export const eliminarEquipo = async (req, res) => {
    try {
        const [rows] = await connection.query('DELETE FROM equipo WHERE id = ?', [req.params.id]);
        return res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        return res.json({ message: error });
    }
}