//import * as empleadosController from '../controller/empleados.controller.js';
import { connection } from '../config/db.js';

//Insertar empleado
export const insertarEmpleado = async (req, res) => {
    const { nombre, email, cargo } = req.body;
    try{
        const [ rows ] = await connection.query('INSERT INTO empleados (nombre, email, cargo) VALUES (?, ?, ?)',
        [nombre, email, cargo]);
        res.json({ message: 'Empleado insertado', id: rows.insertId });
    }catch(error){
        res.json({ message: error });
        console.log(error);
    }
}

//Obtener empleados
export const obtenerEmpleados = async (req, res) => {
    try{
        const [ rows ] = await connection.query('SELECT * FROM empleados');
        res.json(rows);
    }catch(error){
        res.json({ message: error });
        console.log(error);
    }
}

//obtener empleado desde la url
export const obtenerEmpleadoIDURL = async (req, res) => {
    const { id } = req.params;
    try{
        const [ rows ] = await connection.query('SELECT * FROM empleados WHERE id = ?', [id]);
        if(rows.length === 0){
            return res.json({ message: 'Empleado no encontrado' });
        }
        res.json(rows);
    }catch(error){
        res.json({ message: error });
        console.log(error);
    }
}

//Actualizar empleado desde la url
export const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, cargo } = req.body;
    try{
        const [ rows ] = await connection.query('UPDATE empleados SET nombre = ?, email = ?, cargo = ? WHERE id = ?',
        [nombre, email, cargo, id]);
        if(rows.affectedRows === 0){
            return res.json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado actualizado' });
    }catch(error){
        res.json({ message: error });
        console.log(error);
    }
}