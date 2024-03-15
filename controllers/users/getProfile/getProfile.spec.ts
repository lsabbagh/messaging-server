import {it, expect} from 'vitest'
import supertest from 'supertest'

import {HttpStatusCode} from 'axios'


it.only('will fail because it is unauthorized', async () => {
   const response = await global.app
    .get('/user/profile/1', {})

    expect(response.status).toBe(HttpStatusCode.Ok)
})

