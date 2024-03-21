import {it, expect} from 'vitest'
import supertest from 'supertest'

import {HttpStatusCode} from 'axios'


it.skip('will fail because it is unauthorized', async () => {
   const response = await global.app
    .get('/api/users/list', {})

    expect(response.status).toBe(HttpStatusCode.Unauthorized)
})

