import { connection } from "../config/db.js";
import { format } from "date-fns";

export const obtenerAsignaciones = async (req, res) => {
    try {
        const [rows] = await connection.query(`
            SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, 
                   emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, 
                   a.fecha_asignacion 
            FROM asignaciones a 
            JOIN equipo e ON a.id_equipo = e.id 
            JOIN empleados emp ON a.id_empleado = emp.id 
            JOIN usuarios u ON a.id_usuario = u.id
        `);
        
        // Formatear la fecha a dd-MM-yyyy
        rows.forEach((row) => {
            row.fecha_asignacion = format(new Date(row.fecha_asignacion), 'dd-MM-yyyy');
        });

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};


//borrar una asignacion por id desde la url
export const borrarAsignacion = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('DELETE FROM asignaciones WHERE id = ?', [id]);
        res.json({ message: 'Asignacion eliminada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//agregar una asignacion
export const agregarAsignacion = async (req, res) => {
    const { id_equipo, id_usuario, id_empleado, fecha_asignacion } = req.body;

    // Convertir fecha de dd-mm-aaaa a aaaa-mm-dd
    const partesFecha = fecha_asignacion.split('-');
    if (partesFecha.length !== 3) {
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }
    const fechaSQL = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    try {
        const [rows] = await connection.query('INSERT INTO asignaciones (id_equipo, id_empleado, id_usuario, fecha_asignacion) VALUES (?, ?, ?, ?)', [id_equipo, id_empleado, id_usuario, fechaSQL]);
        res.json({ message: 'Asignación agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar asignación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



//obtener una asignacion por id desde la url
    export const obtenerAsignacionIDURL = async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id WHERE a.id = ?', [id]);
            if (rows.length === 0) {
                res.json({ message: 'Asignacion no encontrada' });
            }
            rows.forEach((row) => {
                row.fecha_asignacion = new Date(row.fecha_asignacion).toLocaleDateString();
            });
            res.json(rows);
        } catch (error) {
            res.json({ message: error });
            console.log(error);
        }
    }
//actualizar una asignacion por id desde la url
export const actualizarAsignacionIDURL = async (req, res) => {
    const { id } = req.params;
    const { nombre_equipo, nombre_empleado, nombre_usuario, fecha_asignacion } = req.body;

    // Convertir fecha de dd-mm-aaaa a aaaa-mm-dd
    const partesFecha = fecha_asignacion.split('/');
    if (partesFecha.length !== 3) {
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }
    const fechaSQL = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    try {
        const query = `
            UPDATE asignaciones a
            JOIN equipo e ON a.id_equipo = e.id
            JOIN empleados emp ON a.id_empleado = emp.id
            JOIN usuarios u ON a.id_usuario = u.id
            SET e.nombre = ?, emp.nombre = ?, u.nombre = ?, a.fecha_asignacion = ?
            WHERE a.id = ?;
        `;

        const [result] = await connection.query(query, [nombre_equipo, nombre_empleado, nombre_usuario, fechaSQL, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Asignación y nombres actualizados' });
        } else {
            res.status(404).json({ message: 'Asignación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};


                  