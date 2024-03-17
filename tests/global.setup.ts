import { beforeAll } from "vitest";



import createServer from '../src/createServer'
import supertest from 'supertest'
const app = createServer()
const signin = async () => {
    const superTestApp = await supertest(app)
    global.app = superTestApp
    const id = Date.now()
    const newAdmin = {
        username: 'user-' + id,
        email: 'user-' + id + '@gmail.com',
        password: 'this-is-test-password',
        type: 'admin'
    }

    const responseCreatedAdmin = await superTestApp
        .post('/api/users/')
        .send(newAdmin)

    const userCreated = responseCreatedAdmin.body._user

    console.log('.....', { userCreated })

    const responseLogin = await superTestApp
        .post('/api/login/')
        .send({
            username: newAdmin.username,
            password: newAdmin.password
        })

    // TODO: fix this, login must go here
    console.log('....login: ', responseLogin.body)
    global.token = responseLogin.body.token
}
beforeAll(async () => {
    await signin()
})

