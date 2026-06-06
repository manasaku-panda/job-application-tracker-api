const { sendresponse } = require('../utils/response');

const errorhandler = (err, req, res, next)=>{
    console.log(err);
    return sendresponse(res,
        err.status  || 500,
        err.message || 'Internal Server Error'
    );
};

module.exports = errorhandler;