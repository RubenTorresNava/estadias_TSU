import { connection } from "../config/db.js";

//seleccionar todas las asignaciones
export const obtenerAsignaciones = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id');
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una asignacion por id
export const obtenerAsignacionID = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id WHERE a.id = ?', [id]
    );
        if (rows.length === 0) {
            res.json({ message: 'Asignacion no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//borrar una asignacion
export const borrarAsignacion = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('DELETE FROM asignaciones WHERE id = ?', [id]);
        res.json({ message: 'Asignacion eliminada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//actualizar una asignacion
export const actualizarAsignacion = async (req, res) => {
    const { id, id_equipo, id_usuario, fecha_asignacion } = req.body;
    try {
        const [rows] = await connection.query('UPDATE asignaciones SET id_equipo = ?, id_usuario = ?, fecha_asignacion = ? WHERE id = ?', [id_equipo, id_usuario, fecha_asignacion, id]);
        res.json({ message: 'Asignacion actualizada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//agregar una asignacion
export const agregarAsignacion = async (req, res) => {
    const { id_equipo, id_usuario, id_empleado, fecha_asignacion, } = req.body;
    try {
        const [rows] = await connection.query('INSERT INTO asignaciones (id_equipo, id_empleado, id_usuario, fecha_asignacion) VALUES (?, ?, ?, ?)', [id_equipo, id_empleado,   id_usuario, fecha_asignacion]);
        res.json({ message: 'Asignacion agregada' });
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una asignacion por nombre del equipo
export const obtenerAsignacionEquipo = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id WHERE e.nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Asignacion no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una asignacion por nombre del empleado
export const obtenerAsignacionEmpleado = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id WHERE emp.nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Asignacion no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar una asignacion por nombre del usuario
export const obtenerAsignacionUsuario = async (req, res) => {
    const { nombre } = req.body;
    try {
        const [rows] = await connection.query('SELECT a.id AS asignacion_id, e.nombre AS nombre_equipo, emp.nombre AS nombre_empleado, u.nombre AS nombre_usuario, a.fecha_asignacion FROM asignaciones a JOIN equipo e ON a.id_equipo = e.id JOIN empleados emp ON a.id_empleado = emp.id JOIN usuarios u ON a.id_usuario = u.id WHERE u.nombre = ?', [nombre]);
        if (rows.length === 0) {
            res.json({ message: 'Asignacion no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
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
            res.json(rows);
        } catch (error) {
            res.json({ message: error });
            console.log(error);
        }
    }