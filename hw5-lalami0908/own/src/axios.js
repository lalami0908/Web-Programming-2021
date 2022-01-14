import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4001/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  console.log(number)
  let par2 = 123;
  const {
    data: { msg, count }
  } = await instance.get('/guess', { params: { number, par2 } })
  console.log(count)
  return msg
}

const restart = async () => {
  console.log('restart');
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
