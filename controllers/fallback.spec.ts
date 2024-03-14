import createServer from '../createServer'
import {it, expect} from 'vitest'
import supertest from 'supertest'
const app = createServer()

// put this inside texts and continue them




it('will fallback to the api /', async () => {

   const response = await supertest(app)
    .get('/', {})

    expect(response.body.message).toBe('hello')
})

