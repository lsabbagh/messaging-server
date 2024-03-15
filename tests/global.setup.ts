import { beforeAll } from "vitest";



import createServer from '../createServer'
import supertest from 'supertest'
const app = createServer()
beforeAll(async () => {
    const superTestApp = await supertest(app)
    global.app = superTestApp
})

