import { it, expect, describe } from 'vitest'

import { HttpStatusCode } from 'axios'


describe('getProfile', () => {

    it('200', async () => {
        const response = await global.superTestApp
            .get('/user/profile/1', {})
            .set('token', global.token)

        expect(response.status).toBe(HttpStatusCode.Ok)
    })

    it('403', async () => {
        const response = await global.superTestApp
            .get('/api/user/profile/1')

        expect(response.status).toBe(HttpStatusCode.Unauthorized)
    })

})