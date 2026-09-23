const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const { decordToken, verifyRefreshToken } = require('../utils/token');

const authMiddleware = (req, res, next) => {
    try {
        authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendresponse(res, STATUS.UNAUTHORIZED, MESSAGE.NO_TOKEN);
        };

        const token = authHeader.split(' ')[1];

        try {
            const decoded = decordToken(token);

            req.user = decoded;
            next();

        } catch (err) {
            return sendresponse(res, STATUS.UNAUTHORIZED, MESSAGE.INVALID_EXPIRED_TOKEN);
        }
    } catch (error) {
        next(error)
    }
};

const verifyrefresh = (req, res, next) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        console.log("REFRESH TOKEN:", refreshToken);

        if (!refreshToken) {
            return sendresponse(
                res,
                STATUS.UNAUTHORIZED,
                MESSAGE.NO_TOKEN
            );
        }

        const decoded = verifyRefreshToken(refreshToken);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("REFRESH ERROR:", error);

        return sendresponse(
            res,
            STATUS.UNAUTHORIZED,
            MESSAGE.INVALID_EXPIRED_TOKEN
        );
    }
};

module.exports = {
    authMiddleware,
    verifyrefresh
}