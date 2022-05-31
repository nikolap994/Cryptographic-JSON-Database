class Prototype {
  constructor(data, algorithm, key, iV) {
    this.data = data ? data : "[]";
    this.algorithm = algorithm ? algorithm : null;
    this.key = key;
    this.iV = iV;
  }

  encrypt() {
    const cryptoStandard = require("./security/" + this.algorithm);
    const decryption = cryptoStandard.decrypt(data, this.key, this.iV);

    return decryption;
  }

  decrypt() {
    const cryptoStandard = require("./security/" + this.algorithm);
    const encryption = cryptoStandard.encrypt(data, this.key, this.iV);

    return encryption;
  }
}

module.exports = Prototype;
