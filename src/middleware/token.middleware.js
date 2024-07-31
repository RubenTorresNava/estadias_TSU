import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; 
    try {
        // Verificar el token usando 'jsonwebtoken.verify'
        const decoded = jwt.verify(token, 'secretkey'); // Usa la misma clave secreta que usaste al generar el token
        req.userId = decoded.id; // Asignar el ID del usuario al request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
};

export default verificarToken;
