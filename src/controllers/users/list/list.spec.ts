import {it, expect, describe} from 'vitest'
import supertest from 'supertest'

import {HttpStatusCode} from 'axios'


describe('', () => {
    it('Unauthorized' , async () => {
        const response = await global.superTestApp
        .get('/api/users/list', {})

        expect(response.status).toBe(HttpStatusCode.Unauthorized)
    })
})

