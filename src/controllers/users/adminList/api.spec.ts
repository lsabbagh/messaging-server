import {it, expect, describe} from 'vitest'

import {HttpStatusCode} from 'axios'

describe('', () => {
  it('will get deleted admins only', async () => {
      const response = await global.superTestApp
        .get('/api/users/list/admins')
        .set('isdeleted', 'true')
        .set('token', global.token)
        .set('authtype', 'cms')

      expect(response.status).toBe(HttpStatusCode.Ok)
      expect(response.body).to.be.an('array')
  })
})