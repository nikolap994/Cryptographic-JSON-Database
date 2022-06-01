const crypto = require("crypto");

class DES {
  /**
   *
   * @param {string} val
   * @param {string} ENC_KEY
   * @param {string} IV
   * @returns
   */
  encrypt(val, ENC_KEY, IV) {
    const cipher = crypto.createCipheriv("DES-CBC", ENC_KEY, IV);
    let encrypted = cipher.update(val, "utf8", "hex");
    encrypted += cipher.final("hex");

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
    const decipher = crypto.createDecipheriv("DES-CBC", ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

module.exports = DES;
