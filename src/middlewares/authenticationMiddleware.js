const jsonwebtoken = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const { ClientError } = require("../lib/utils");

function authenticationMiddleware(req, res, next){
  const auth = req.headers;

  if (!auth.cookie) {
    throw new ClientError("JWT Token não foi informado!", 401);
  }

  const token = auth.cookie.split('token=')[1]

  try {
    const { sub: user_id, role} = jsonwebtoken.verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id),
      role
    }

    next() 
  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      throw new ClientError("JWT Token informado é invalido!", 401);
    }
  }
}

module.exports = authenticationMiddleware