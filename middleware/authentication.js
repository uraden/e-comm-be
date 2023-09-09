const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }

    try {
        const {name, userId, role} = await isTokenValid({token});
        req.user = {name, userId, role}; 
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid 2');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
  }


module.exports = {
    authenticateUser,
    authorizePermissions
};