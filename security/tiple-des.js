const crypto = require("crypto");

class TRIPLE_DES {
  /**
   *
   * @param {string} text
   * @param {string} keyHex
   * @param {string} ivHex
   * @returns
   */
  decrypt(text, keyHex, ivHex) {
    ivHex = Buffer.from(ivHex, "utf8");
    keyHex = Buffer.from(keyHex, "utf8");

    const cipher = crypto.createDecipheriv("DES-EDE3-CBC", keyHex, ivHex);
    let encrypted = cipher.update(text, "base64", "utf8");
    encrypted += cipher.final("utf8");

    return encrypted;
  }

  /**
   *
   * @param {string} encrypted
   * @param {string} keyHex
   * @param {string} ivHex
   * @returns
   */
  encrypt(encrypted, keyHex, ivHex) {
    ivHex = Buffer.from(ivHex, "utf8");
    keyHex = Buffer.from(keyHex, "utf8");

    const cipher = crypto.createCipheriv("DES-EDE3-CBC", keyHex, ivHex);
    let decrypted = cipher.update(encrypted, "utf8", "base64");
    decrypted += cipher.final("base64");

    return decrypted;
  }
}

module.exports = TRIPLE_DES;
