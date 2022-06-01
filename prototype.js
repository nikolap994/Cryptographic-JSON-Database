class Prototype {
  /**
   *
   * @param {string} data
   * @param {string} algorithm
   * @param {string} key
   * @param {string} iV
   */
  constructor(algorithm, key, iV) {
    this.algorithm = algorithm ? algorithm : null;
    this.key = key;
    this.iV = iV;
  }

  /**
   *
   * @returns string
   */
  encrypt(data) {
    try {
      const fileName = "./security/" + this.algorithm;
      const cryptoStandard = require(fileName);
      const crypto = new cryptoStandard();
      const encryption = crypto.encrypt(data, this.key, this.iV);

      return encryption;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   *
   * @returns string
   */
  decrypt(data) {
    try {
      const fileName = "./security/" + this.algorithm;
      const cryptoStandard = require(fileName);
      const crypto = new cryptoStandard();
      const decryption = crypto.decrypt(data, this.key, this.iV);

      return decryption;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Prototype;
