const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateToken = (data) =>{
    return jwt.sign(data, JWT_SECRET,{
        expiresIn: '1h'
    });
};

const decordToken = (token) =>{
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};

const generateRefreshToken = (data) =>{
    return jwt.sign(data, JWT_REFRESH_SECRET, {
        expiresIn: '1d'
    });
};

const verifyRefreshToken = (token) =>{
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    return decoded;
}
module.exports ={
    generateToken,
    decordToken,
    generateRefreshToken,
    verifyRefreshToken
}