import createServer from '@createServer'

import createExpressApp from '@createExpressApp'
import getMongooseConnection from 'db/getMongooseConnection'

const port = process.env.PORT || 5000
const dbName = process.env.DB_NAME || 'dev'
const dbURI = process.env.MONGO_URI;


const start = async () => {

    const expressApp = createExpressApp()

    const mongooseConnection = await getMongooseConnection(dbURI, dbName)

    console.log('mongooseConnection state', mongooseConnection.readyState.toString())

    const onServer = () =>
        console.log(`Server is running on port ${port}`)
    const server = await createServer(expressApp, Number(port), onServer)

    console.log('server', server.connections.toString())
}

start()