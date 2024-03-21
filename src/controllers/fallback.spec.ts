import {it, expect} from 'vitest'

it('will fallback to the api /', async () => {
   const response = await global.app
    .get('/', {})

    expect(response.body.message).toBe('hello')
    expect(response.status).toBe(200)

})

