import { connection } from "../config/db.js";

//seleccionar todos los estados
export const obtenerEstados = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM estadoequipo');
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}

//seleccionar un estado por id
export const obtenerEstadoID = async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await connection.query('SELECT * FROM estadoequipo WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.json({ message: 'Estado no encontrado' });
        }
        res.json(rows);
    } catch (error) {
        res.json({ message: error });
        console.log(error);
    }
}
