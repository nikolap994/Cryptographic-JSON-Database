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
    const cryptoStandard = require("./security/" + this.algorithm);
    const decryption = cryptoStandard.decrypt(data, this.key, this.iV);

    return decryption;
  }

  /**
   * 
   * @returns string
   */
  decrypt(data) {
    const cryptoStandard = require("./security/" + this.algorithm);
    const encryption = cryptoStandard.encrypt(data, this.key, this.iV);

    return encryption;
  }
}

module.exports = Prototype;