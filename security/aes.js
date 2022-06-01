const crypto = require("crypto");

class AES {
  /**
   * 
   * @param {string} val 
   * @param {string} ENC_KEY 
   * @param {string} IV 
   * @returns 
   */
  encrypt(val, ENC_KEY, IV) {
    let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
    let encrypted = cipher.update(val, "utf8", "base64");
    encrypted += cipher.final("base64");

    return encrypted;
  }

  /**
   * 
   * @param {string} encrypted 
   * @param {string} ENC_KEY 
   * @param {string} IV 
   * @returns 
   */
  decrypt(encrypted, ENC_KEY, IV) {
    let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, "base64", "utf8");

    return decrypted + decipher.final("utf8");
  }
}

module.exports = AES;