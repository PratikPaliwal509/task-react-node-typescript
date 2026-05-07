import CryptoJS from "crypto-js";

const FRONTEND_SECRET = "frontend_secret_key_123";

export const encryptData = (data: any) => {
  return {
    _id: data._id, // ID is not encrypted 
    fullName: CryptoJS.AES.encrypt(data.fullName, FRONTEND_SECRET).toString(),
    email: CryptoJS.AES.encrypt(data.email, FRONTEND_SECRET).toString(),
    phone: CryptoJS.AES.encrypt(data.phone, FRONTEND_SECRET).toString(),
    dob: CryptoJS.AES.encrypt(data.dob, FRONTEND_SECRET).toString(),
    gender: CryptoJS.AES.encrypt(data.gender, FRONTEND_SECRET).toString(),
    address: CryptoJS.AES.encrypt(data.address, FRONTEND_SECRET).toString(),
    course: CryptoJS.AES.encrypt(data.course, FRONTEND_SECRET).toString(),
    password: CryptoJS.AES.encrypt(data.password, FRONTEND_SECRET).toString(),
  };
};
// Level 1 Decryption (Frontend)
export const decryptData = (data: any) => {
  return {
    _id: data._id, // ID is not encrypted
    fullName: CryptoJS.AES.decrypt(data.fullName, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    email: CryptoJS.AES.decrypt(data.email, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    phone: CryptoJS.AES.decrypt(data.phone, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    dob: CryptoJS.AES.decrypt(data.dob, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    gender: CryptoJS.AES.decrypt(data.gender, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    address: CryptoJS.AES.decrypt(data.address, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    course: CryptoJS.AES.decrypt(data.course, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
    password: CryptoJS.AES.decrypt(data.password, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8),
  };
};