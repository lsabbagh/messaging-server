import createServer from '../../createServer'
import {it, expect} from 'vitest'
import supertest from 'supertest'
const app = createServer()

// put this inside texts and continue them




it('will list the users', async () => {

   const response = await supertest(app)
    .get('/api/users/list', {})

    expect(response.status).toBe(402)
})

