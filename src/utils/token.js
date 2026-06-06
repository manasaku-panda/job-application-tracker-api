const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (data) =>{
    return jwt.sign(data, JWT_SECRET,{
        expiresIn: '1h'
    });
};

const decordToken = (token) =>{
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};
module.exports ={
    generateToken,
    decordToken
}