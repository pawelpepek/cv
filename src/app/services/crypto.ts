import * as CryptoJS from 'crypto-js';
import { environment } from '../../environment/environment';

export function encryptData(data: string): string {
  const encrypted = CryptoJS.AES.encrypt(data, environment.secretKey).toString();
  return encrypted;
}

export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, environment.secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}