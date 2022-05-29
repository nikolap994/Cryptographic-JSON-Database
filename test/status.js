const fs = require("fs");
const SecureJson = require("../helper/json");

class Status {
  constructor(name) {
    this.memoryStart = undefined;
    this.memoryEnd = undefined;
    this.memoryStatus = {};
    this.databaseName = name;
    this.json = new SecureJson(name);
  }

  scriptStart(name) {
    console.time(name);
    this.memoryStart = process.memoryUsage();
  }

  scriptEnd(name) {
    console.timeEnd(name);
    this.memoryEnd = process.memoryUsage();

    this.memoryStatus["consumedMemory2ndCall"] =
      (this.memoryEnd.rss - this.memoryStart.rss) / 1024 / 1024 + " MB";
  }

  memoryUsage() {
    const formatMemoryUsage = (data) =>
      `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;
    const memoryData = process.memoryUsage();

    this.memoryStatus["rss"] = formatMemoryUsage(memoryData.rss);
    this.memoryStatus["heapTotal"] = formatMemoryUsage(memoryData.heapTotal);
    this.memoryStatus["external"] = formatMemoryUsage(memoryData.external);

    if (fs.existsSync(this.databaseName)) {
      this.json.append(this.memoryStatus);
    } else {
      this.json.write("[" + JSON.stringify(this.memoryStatus) + "]");
    }
  }
}

module.exports = Status;
