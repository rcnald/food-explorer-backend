const bcrypt = require('bcrypt');

class ClientError{
  constructor(message, status = 400){
    this.message = message
    this.status = status
  }
}


const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}

const hashPassword = async (password) => {
  const salt = 10
  let hashedPassword = null
  if(password){
    hashedPassword = await bcrypt.hash(password, salt)
  }
  return hashedPassword
}


module.exports = { ClientError, isEmailValid, hashPassword }