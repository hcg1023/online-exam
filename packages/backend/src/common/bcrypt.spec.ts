import { compare, encrypt } from './bcrypt';

describe('Crypto', () => {
  it('test crypto', () => {
    const password = 'test';
    const encryptedText = encrypt(password);
    expect(compare(password, encryptedText)).toBeTruthy();
  });
});
