import {it, expect} from 'vitest'

import {HttpStatusCode} from 'axios'

it.skip('will get deleted admins only', async () => {
  const response = await global.app
   .set('isdeleted', 'true')
   .set('token', global.token)
   .set('authtype', 'cms')
   .get('/api/users/list/admins', {})

   expect(response.body).to.be.an('array')

  //  response.body.forEach(obj => {
  //   expect(obj).to.be.an('object');
  //   expect(obj).to.have.property('_id');
  //   expect(obj).to.have.property('username');
  //   expect(obj).to.have.property('email');
  //   expect(obj).to.have.property('type');
  //   expect(obj).to.have.property('isdeleted');
  //   expect(obj).to.have.property('profilePic');
  // });
  })