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
    databaseContent.push(data);

    datas.forEach((entry) => {
      databaseContent.push(entry);
    });

    try {
      this.write(JSON.stringify(databaseContent));
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
      const datas = await this.read();
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

      if (searchResult.length === 0) {
        this.printMsg("No entries found");
      } else if (searchResult.length === 1) {
        let key = searchResult[0][0];

        updates.forEach((update) => {
          let updateKey = update[0];
          let updateValue = update[1];

          datas[key][updateKey] = updateValue;
        });

        this.write(JSON.stringify(datas));
      } else {
        this.printMsg("Multiple entries found");
      }
    } catch (err) {
      this.printMsg(err);
      return;
    }
  }

  /**
   * Find in database based on query.
   * @param {array} search 
   * @returns 
   */
  async find(search) {
    try {
      const datas = await this.read();
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
   * Prints message.
   * @param {string} msg
   */
  printMsg(msg) {
    console.log(msg);
  }
}

module.exports = SecureJson;
