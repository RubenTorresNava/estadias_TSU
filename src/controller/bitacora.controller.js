import { connection } from "../config/db.js";

//seleccionar todas las bitacoras
export const obtenerBitacoras = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id');
        rows.forEach((row) => {
            row.fecha = new Date(row.fecha).toLocaleDateString();
        });
        return res.json(rows);
    } catch (error) {
        return res.json({ message: error });
    }
}

//agregar una bitacora
export const agregarBitacora = async (req, res) => {
    const { fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;
     // Convertir fecha de dd-mm-aaaa a aaaa-mm-dd
     const partesFecha = fecha.split('-');
     if (partesFecha.length !== 3) {
         return res.status(400).json({ message: 'Formato de fecha inválido' });
     }
     const fechaSQL = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    try {
        const [rows] = await connection.query('INSERT INTO bitacora (fecha, descripcion, id_usuario, id_equipo, id_asignacion) VALUES (?, ?, ?, ?, ?)', [fechaSQL, descripcion, id_usuario, id_equipo, id_asignacion]);
       return res.json({ message: 'Bitacora agregada' });
    } catch (error) {
        return res.json({ message: error });
    }
}

//obtener bitacora por id desde la url
export const obtenerBitacoraIDURL = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('SELECT b.id AS bitacora_id, a.id AS asignacion_id, e.nombre AS nombre_equipo, u.nombre AS nombre_usuario, b.fecha, b.descripcion FROM bitacora b JOIN asignaciones a ON b.id_asignacion = a.id JOIN equipo e ON a.id_equipo = e.id JOIN usuarios u ON b.id_usuario = u.id WHERE b.id = ?', [id]);
        if (rows.length === 0) {
            return res.json({ message: 'Bitacora no encontrada' });
        }
        rows.forEach((row) => {
            row.fecha = new Date(row.fecha).toLocaleDateString();
        });
        res.json(rows);
    } catch (error) {
        return res.json({ message: error });
    }
}

//actualizar bitacora desde la url
export const actualizarBitacora = async (req, res) => {
    const { id } = req.params;
    const { fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;
    // Convertir fecha de dd-mm-aaaa a aaaa-mm-dd
    const partesFecha = fecha.split('-');
    if (partesFecha.length !== 3) {
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }
    const fechaSQL = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
    try {
        const [rows] = await connection.query('UPDATE bitacora SET fecha = ?, descripcion = ?, id_usuario = ?, id_equipo = ?, id_asignacion = ? WHERE id = ?', [fechaSQL, descripcion, id_usuario, id_equipo, id_asignacion, id]);
        if (rows.affectedRows > 0) {
            return res.json({ message: 'Bitacora actualizada' });
        }
        return res.json({ message: 'Bitacora no encontrada' });
    } catch (error) {
        return res.json({ message: error });
    }
}

//eliminar bitacora desde la url
export const eliminarBitacora = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.query('DELETE FROM bitacora WHERE id = ?', [id]);
        if (rows.affectedRows > 0) {
            return res.json({ message: 'Bitacora eliminada' });
        }
        return res.json({ message: 'Bitacora no encontrada' });
    } catch (error) {
        return res.json({ message: error });
    }
}
