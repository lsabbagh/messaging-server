import {it, expect, describe} from 'vitest'
import supertest from 'supertest'

import {HttpStatusCode} from 'axios'


// Ɖ✌: list users
describe('', () => {
    it('Unauthorized' , async () => {
        // const response = await global.superTestApp
        // .get('/api/users/list', {})

        // console.log('....', response.response)

        // expect(response.status).toBe(HttpStatusCode.Unauthorized)
    })
})
describe.only('Just pass', () => {
    it('true!' , async () => {
        expect(true).toBe(true)
    })
})