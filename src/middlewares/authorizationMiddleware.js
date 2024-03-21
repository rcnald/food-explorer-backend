const { ClientError } = require("../lib/utils")

function authorizationMiddleware({accessRole}){
  return (req, res, next) => {
    const { role } = req.user

    if(!accessRole.includes(role)){
      throw new ClientError("Não autorizado!", 401)
    }

    return next()
  }
}

module.exports = authorizationMiddleware