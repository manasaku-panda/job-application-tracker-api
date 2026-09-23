
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

        res.cookie("refreshToken", result.refreshtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.LOGIN_SUCCESS, {accessToken: result.token});
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


const refreshverifiedsendtoken = async(req, res, next) =>{
    try {
        const userData = req.user;

        const result = await authservices.refreshverifiedsendtoken(userData); 

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.ACCESS_TOKEN_REFRESHED, {accessToken: result.token});
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return sendresponse(
            res,
            STATUS.SUCCESS,
            MESSAGE.LOGOUT_SUCCESS,
            null
        );
    } catch (error) {
        next(error);
    }
};



module.exports ={
    register,
    login,
    profile,
    refreshverifiedsendtoken,
    logout
}