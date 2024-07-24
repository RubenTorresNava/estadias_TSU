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

//buscar equipos por nombre
export const busquedaEquipos = async (req, res) => {
    const { busqueda } = req.query;

    try {
        const [rows] = await connection.query(`
            SELECT e.id AS equipo_id, e.nombre, e.descripcion, e.fecha_adquisision, e.estado_equipo_id
            FROM equipo e
            WHERE e.nombre LIKE ?
        `, [`%${busqueda}%`]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }

        return res.status(200).json(rows); // Aquí enviamos los resultados de la consulta SQL
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};

//buscar empleados por nombre
export const busquedaEmpleados = async (req, res) => {
    const { busqueda } = req.query;

    try {
        const [rows] = await connection.query(`
            SELECT emp.id AS empleado_id, emp.nombre, emp.email, emp.cargo
            FROM empleados emp
            WHERE emp.nombre LIKE ?
        `, [`%${busqueda}%`]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        return res.status(200).json(rows); // Aquí enviamos los resultados de la consulta SQL
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};

//buscar usuarios por nombre
export const busquedaUsuarios = async (req, res) => {
    const { busqueda } = req.query;

    try {
        const [rows] = await connection.query(`
            SELECT u.id AS usuario_id, u.nombre, u.apellido, u.email, u.rol, u.estado
            FROM usuarios u
            WHERE u.nombre LIKE ?
        `, [`%${busqueda}%`]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(rows); // Aquí enviamos los resultados de la consulta SQL
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
};

