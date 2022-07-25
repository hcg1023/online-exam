import { encrypt } from './crypto';

describe('Crypto', () => {
  it('test crypto', () => {
    expect(encrypt('test')).toBe('���\'�K�A8����"�');
  });
});
