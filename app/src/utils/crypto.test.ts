import { assert, describe, it } from 'vitest'
import { encrypt, decrypt } from './crypto'

describe('crypto module test suite', () => {

  const text = 'this is simple text';
  const salt = 'salt';

  it('is encrypting', () => {
    assert.ok(![text, salt].includes(encrypt(text, salt)));
  })

  it('is not decrypting plain text', () => {
    const decrypted = decrypt(text, salt)
    assert.ok(text !== decrypted)
  })

  it('is decrypting encrypted text', () => {
    const encrypted = encrypt(text, salt)
    const decrypted = decrypt(encrypted, salt)
    assert.ok(text === decrypted)
  })

})