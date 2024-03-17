import {it, expect} from 'vitest'
import supertest from 'supertest'

import {HttpStatusCode} from 'axios'


it('will fail because it is unauthorized', async () => {
   const response = await global.app
    .put('/api/profile/1', {})

    expect(response.status).toBe(HttpStatusCode.Unauthorized)
})

