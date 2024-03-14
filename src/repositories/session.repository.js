const knex = require("../database/knex")
const bcrypt = require('bcrypt');
const auth = require("../configs/auth")
const { sign } = require("jsonwebtoken");

class SessionRepository {
  async getUserByEmail({ email }){
    const [ user ] = await knex('users').where({email})

    return user
  }

  async comparePassword({ password, currentPassword }){
    return await bcrypt.compare(password, currentPassword)
  }

  createToken({ id }){
    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: String(id),
      expiresIn: expiresIn,
    });

    return token
  }
}

module.exports = SessionRepository