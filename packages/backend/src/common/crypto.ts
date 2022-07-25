import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'node:crypto';

const iv = randomBytes(16);
const algorithm = 'aes-256-cbc';
const hash = 'morgenlicht-online-exam';

const key = scryptSync(hash, 'salt', 32) as Buffer;
console.log(key);
const cipher = createCipheriv(algorithm, key, iv);

export function encrypt(text: string): string {
  return Buffer.concat([cipher.update(text), cipher.final()]).toString();
}

const decipher = createDecipheriv('aes-256-ctr', key, iv);
export function decrypt(text: string): string {
  const decryptedText = new Buffer(text);
  return Buffer.concat([
    decipher.update(decryptedText),
    decipher.final(),
  ]).toString();
}
