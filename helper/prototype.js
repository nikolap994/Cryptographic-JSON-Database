class Prototype {
  constructor(databaseName, encoding, algorithm, key, iV) {
    this.databaseName = databaseName ? databaseName : "default.json";
    this.encoding = encoding ? encoding : "utf-8";
    this.algorithm = algorithm ? algorithm : null;
    this.key = key;
    this.iV = iV;
  }

  read() {
    const SecureJson = require("./json");
    const DB = new SecureJson(this.databaseName, this.encoding);

    DB.read().then((data) => {
      const cryptoStandard = require("./security/" + this.algorithm);

      const decryption = cryptoStandard.decrypt(data, this.key, this.iV);

      console.log(decryption);
    });
  }
}

module.exports = Prototype;
