const knex = require("../database/knex")

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
}

module.exports = UserRepository