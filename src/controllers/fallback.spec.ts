import { HttpStatusCode } from 'axios'
import { describe, it, expect } from 'vitest'

describe('fallback', () => {
    it('200', async () => {
        const response = await global.superTestApp
            .get('/', {})

        expect(response.body.message).toBe('hello')
        expect(response.status).toBe(HttpStatusCode.Ok)
    })

    it('200.token', async () => {
        const response = await global.superTestApp
            .get('/', {})
            .set('token', global.token)

        expect(response.body.message).toBe('hello')
        expect(response.status).toBe(HttpStatusCode.Ok)
    })
})