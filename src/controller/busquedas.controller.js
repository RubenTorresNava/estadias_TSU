import { connection } from "../config/db.js";

//buscar asignaciones por nombre de empleado
export const busquedaAsignaciones = async (req, res) => {
    const { busqueda } = req.query;

    try {
        const [rows] = await connection.query(`
            SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion
            FROM asignaciones a
            JOIN equipo e ON a.id_equipo = e.id
            JOIN empleados emp ON a.id_empleado = emp.id
            JOIN usuarios u ON a.id_usuario = u.id
            WHERE emp.nombre LIKE ?
        `, [`%${busqueda}%`]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Asignación no encontrada' });
        }

        return res.status(200).json(rows); // Aquí enviamos los resultados de la consulta SQL
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};
