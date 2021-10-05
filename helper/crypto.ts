const CryptoJS = require('crypto-js');
const { SECRET_KEY = 'TEST KEY' } = process.env;
export const encrypt = (password: string): string => CryptoJS.HmacSHA1(password, SECRET_KEY);
