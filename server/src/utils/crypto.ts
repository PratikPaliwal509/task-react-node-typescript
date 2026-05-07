import crypto from "crypto";
import CryptoJS from "crypto-js";

const SECRET_KEY = "8f3a1c2d9b7e4f6a1c0d3e9a7b5c1d2e8f3a1c2d9b7e4f6a1c0d3e9a7b5c1d2e";
const FRONTEND_SECRET = "frontend_secret_key_123";

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (text: string): string => {
  const parts = text.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = parts[1];

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export const decryptFrontend = (text: string): string => {
  return CryptoJS.AES.decrypt(text, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8);
};