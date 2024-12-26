const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authenticateUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized',success:false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized',success:false });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized',success:false });
    }
}