const knex = require("../database/knex")
const bcrypt = require('bcrypt');

class UserRepository {
  async create({email, name, password}){
    const id = await knex('users').insert({email, name, password});

    return { id }
  }

  async isEmailTaken({email, id = undefined}){
    const [ user ] = await knex('users').select('id').where({email}) 

    const isUserEmail =  user?.id === id 
  
    return !isUserEmail && user 
  }

  async hashPassword({ password = null, salt = 10 }){
    const hashedPassword = password && bcrypt.hash(password, salt)

    return hashedPassword
  }
}

module.exports = UserRepository