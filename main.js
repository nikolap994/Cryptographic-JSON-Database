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
  async read() {
    try {
      const response = fs.readFileSync(this.name, { encoding: this.encoding });
      const jsonData = JSON.parse(response);
      return jsonData;
    } catch (err) {
      this.printMsg(err);
      return;
    }
  }

  /**
   * Writes content of the jsonString to the file (override entire file content).
   * @param {string} jsonString
   */
  async write(jsonString) {
    return fs.writeFileSync(this.name, jsonString, (err) => {
      if (err) {
        this.printMsg("Error writing file", err);
        return;
      } else {
        this.printMsg("Successfully wrote to file");
      }
    });
  }

  /**
   * Append JSON object to existing json file content.
   * @param {object} data
   * @returns
   */
  async append(data) {
    let databaseContent = [];
    const datas = await this.read();
    databaseContent.push(datas);
    databaseContent.push(data);

    try {
      this.write(JSON.stringify(databaseContent));
    } catch (err) {
      this.printMsg(err);
      return;
    }
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
