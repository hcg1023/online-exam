import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function encrypt(text: string): string {
  return bcrypt.hashSync(text, saltOrRounds);
}

export function compare(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}
