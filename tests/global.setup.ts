import { beforeAll } from "vitest";



import createServer from '../src/createServer'
import supertest from 'supertest'
const app = createServer()
beforeAll(async () => {
    const superTestApp = await supertest(app)
    const id = Date.now()
    const newAdmin = {
        username: 'user-' + id,
        email: 'user-' + id,
        password: 'this-is-test-password',
        type: 'admin'
    }

    app.post('./user')


    global.app = superTestApp

})

