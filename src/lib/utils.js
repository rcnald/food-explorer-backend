
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


module.exports = { ClientError, isEmailValid }