import {it, expect} from 'vitest'

import {HttpStatusCode} from 'axios'


it('will fail because it is unauthorized', async () => {
const response = await global.superTestApp
    .put('/api/profile/1', {})

    expect(response.status).toBe(HttpStatusCode.Unauthorized)
})

