import { connection } from "../config/db.js";
import { format, parse } from "date-fns";

//obtener todas las bitacoras
export const obtenerBitacoras = async (req, res) => {
  try {
    const [rows] = await connection.query(`
        SELECT 
        b.id,
        b.fecha,
        b.descripcion,
        u.nombre AS nombre_usuario,
        e.nombre AS nombre_equipo,
        a.fecha_asignacion
        FROM 
        bitacora b
        JOIN 
        usuarios u ON b.id_usuario = u.id
        JOIN 
        equipo e ON b.id_equipo = e.id
        JOIN 
        asignaciones a ON b.id_asignacion = a.id;
    `);
    // Formatear la fecha a dd-MM-yyyy
    rows.forEach((row) => {
      row.fecha = format(new Date(row.fecha), 'dd-MM-yyyy');
      row.fecha_asignacion = format(new Date(row.fecha_asignacion), 'dd-MM-yyyy');
    });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener una bitacora por id desde la url
export const obtenerBitacoraIDURL = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query(`
        SELECT 
        b.id,
        b.fecha,
        b.descripcion,
        u.nombre AS nombre_usuario,
        e.nombre AS nombre_equipo,
        a.fecha_asignacion
        FROM 
        bitacora b
        JOIN 
        usuarios u ON b.id_usuario = u.id
        JOIN 
        equipo e ON b.id_equipo = e.id
        JOIN 
        asignaciones a ON b.id_asignacion = a.id
        WHERE b.id = ?;
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Bitacora no encontrada' });
    }

    // Formatear la fecha a dd-MM-yyyy
    rows.forEach((row) => {
      row.fecha = format(new Date(row.fecha), 'dd-MM-yyyy');
      row.fecha_asignacion = format(new Date(row.fecha_asignacion), 'dd-MM-yyyy');
    });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//actualizar una bitacora por id desde la url
export const actualizarBitacoraIDURL = async (req, res) => {
  const { id } = req.params;
  const { fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;

  // Convertir fecha de dd-MM-yyyy a yyyy-MM-dd
  let fechaSQL;
  try {
    fechaSQL = format(parse(fecha, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
  } catch (error) {
    return res.status(400).json({ message: 'Formato de fecha inválido' });
  }

  try {
    const query = `
        UPDATE bitacora b
        JOIN usuarios u ON b.id_usuario = u.id
        JOIN equipo e ON b.id_equipo = e.id
        JOIN asignaciones a ON b.id_asignacion = a.id
        SET b.fecha = ?, b.descripcion = ?, b.id_usuario = ?, b.id_equipo = ?, b.id_asignacion = ?
        WHERE b.id = ?;
    `;

    const [result] = await connection.query(query, [fechaSQL, descripcion, id_usuario, id_equipo, id_asignacion, id]);
    res.json({ message: 'Bitacora actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//eliminar una bitacora por id desde la url
export const eliminarBitacoraIDURL = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM bitacora WHERE id = ?', [id]);
    res.json({ message: 'Bitacora eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//crear una bitacora
export const crearBitacora = async (req, res) => {
  const { fecha, descripcion, id_usuario, id_equipo, id_asignacion } = req.body;

  // Convertir fecha de dd-MM-yyyy a yyyy-MM-dd
  let fechaSQL;
  try {
    fechaSQL = format(parse(fecha, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');
  } catch (error) {
    return res.status(400).json({ message: 'Formato de fecha inválido' });
  }

  try {
    const query = `
        INSERT INTO bitacora (fecha, descripcion, id_usuario, id_equipo, id_asignacion)
        VALUES (?, ?, ?, ?, ?);
    `;

    const [result] = await connection.query(query, [fechaSQL, descripcion, id_usuario, id_equipo, id_asignacion]);
    res.json({ message: 'Bitacora creada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};