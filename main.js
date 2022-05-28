const fs = require("fs");

class SecureJson {
  /**
   * Default parameters to handle json database.
   * @param {string} name
   * @param {string} encoding
   */
  constructor(name, encoding) {
    this.name = name ? name : "default.json";
    this.encoding = encoding ? encoding : "utf-8";
  }

  /**
   * Reads content of the json file.
   */
  read() {
    fs.readFile(this.name, this.encoding, (err, jsonString) => {
      if (err) {
        this.printMsg(err);
        return;
      } else {
        try {
          const jsonData = JSON.parse(jsonString);
          this.printMsg(jsonData);
        } catch (err) {
          this.printMsg(err);
          return;
        }
      }
    });
  }

  /**
   * Prints message.
   * @param {string} msg
   */
  printMsg(msg) {
    console.log(msg);
  }
}

module.exports = SecureJson;
