import { createConnection } from 'typeorm'
let connection = null
export default async function getConnection(){
    if (connection) {
      return Promise.resolve(connection)
    }
    connection = await createConnection()
    return connection
}
