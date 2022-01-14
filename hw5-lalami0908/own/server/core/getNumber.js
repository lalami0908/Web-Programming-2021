let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(!number || forceRestart){
    number = Math.floor(Math.random() * Math.floor(100));
  }
  return number
}

export default getNumber
