const fs = require("fs");
const Prototype = require("./prototype");

class SecureJson {
  /**
   * Default parameters to handle json database.
   * @param {string} name
   * @param {string} encoding
   */
  constructor(name, encoding, algorithm, key, iV) {
    this.name = name ? name : "default.json";
    this.encoding = encoding ? encoding : "utf-8";
    this.algorithm = algorithm ? algorithm : null;
    this.key = key ? key : null;
    this.iV = iV ? iV : null;

    this.init(name);
  }

  /**
   * Create file if does not exist.
   * @param {string} name
   */
  async init(name) {
    if (!fs.existsSync(name)) {
      fs.promises.writeFile(name, "[]", { encoding: "utf8" }).then(() => {
        console.log("Done");
      });
    }
  }

  /**
   * Reads content of the json file.
   */
  async read() {
    try {
      const Encryption = new Prototype(this.algorithm, this.key, this.iV);
      const response = fs.readFileSync(this.name, { encoding: this.encoding });
      if (response.length) {
        const jsonData = JSON.parse(Encryption.decrypt(response));
        return jsonData;
      }
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
    const Encryption = new Prototype(this.algorithm, this.key, this.iV);
    jsonString = Encryption.encrypt(jsonString);

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
    databaseContent.push(data);

    datas.forEach((entry) => {
      databaseContent.push(entry);
    });

    try {
      const Encryption = new Prototype(this.algorithm, this.key, this.iV);
      this.write(JSON.stringify(Encryption.encrypt(databaseContent)));
    } catch (err) {
      this.printMsg(err);
      return;
    }
  }

  /**
   * Find and update entry from the JSON file.
   * @param {array} search
   * @param {array} updates
   * @returns
   */
  async update(search, updates) {
    try {
      const Encryption = new Prototype(this.algorithm, this.key, this.iV);
      const datas = Encryption.decrypt(await this.read());
      this.find(search).then((searchResult) => {
        if (searchResult.length === 0) {
          this.printMsg("No entries found");
        } else if (searchResult.length === 1) {
          let key = searchResult[0][0];

          updates.forEach((update) => {
            let updateKey = update[0];
            let updateValue = update[1];

            datas[key][updateKey] = updateValue;
          });

          this.write(Encryption.encrypt(JSON.stringify(datas)));
        } else {
          this.printMsg("Multiple entries found");
        }
      });
    } catch (err) {
      this.printMsg(err);
      return;
    }
  }

  /**
   * Find in JSON based on query.
   * @param {array} search
   * @returns
   */
  async find(search) {
    try {
      const Encryption = new Prototype(this.algorithm, this.key, this.iV);
      const datas = Encryption.decrypt(await this.read());
      const sectorParam = search[0];
      const sectorValue = search[1];

      let searchResult = [];

      const asArray = Object.entries(datas);
      asArray.filter(([key, value]) => {
        if (typeof value[sectorParam] !== "undefined") {
          if (value[sectorParam] === sectorValue) {
            searchResult.push([key, value]);
          }
        }
      });

      return searchResult;
    } catch (err) {
      this.printMsg(err);
      return;
    }
  }

  /**
   * Remove entry from JSON by query.
   * @param {array} search
   * @returns
   */
  async remove(search) {
    try {
      const Encryption = new Prototype(this.algorithm, this.key, this.iV);
      let datas = Encryption.decrypt(await this.read());
      this.find(search).then((searchResult) => {
        if (searchResult.length === 0) {
          this.printMsg("No entries found");
        } else if (searchResult.length === 1) {
          let key = searchResult[0][0];

          delete datas[key];
          datas = datas.filter((item) => item);
          this.write(Encryption.encrypt(JSON.stringify(datas)));
        } else {
          this.printMsg("Multiple entries found");
        }
      });
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
