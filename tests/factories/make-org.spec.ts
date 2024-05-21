import { makeOrg } from './make-org'

it('test', () => {
  const org = makeOrg.makeOrgObject({
    email: 'thielson12@gmail.com',
    password: '123456789',
  })

  console.log(org)
})
