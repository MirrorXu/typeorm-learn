import createConnection from '../utils/connection'

;(async () => {
  const connection = await createConnection()
//   console.log('connection:', connection)

  const connection1 = await createConnection()
//   console.log('connection1:', connection1)

  console.log('connection === connection1  ？:',connection === connection1)
})()