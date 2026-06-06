
const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const authservices = require('../services/auth.services');

const register = async(req, res, next)=>{
    try {
        const userData = req.body;

        const result = await authservices.register(userData);

        if (result.user.role === 'admin') {
            return sendresponse(res, STATUS.CREATED, MESSAGE.ADMIN_CREATED, result);
        }
        
        return sendresponse(res, STATUS.CREATED, MESSAGE.USER_CREATED, result);
    } catch (error) {
        next(error);
    }
}

const login = async(req, res,next)=>{
    try {
        const userData = req.body;
        
        const result = await authservices.login(userData);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.LOGIN_SUCCESS, result);
    } catch (error) {
        next(error)
    }
}

const profile = async(req, res, next)=>{
    try {
        const userData = req.user;

        const result = await authservices.profile(userData);

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.USER_FETCH_SUCCESSFULLY, result)
    } catch (error) {
        next(error)
    }
}

module.exports ={
    register,
    login,
    profile
}