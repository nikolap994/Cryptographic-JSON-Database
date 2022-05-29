class Status {
  constructor() {
    this.memoryStart = undefined;
    this.memoryEnd = undefined;
  }

  scriptStart(name) {
    console.time(name);
    this.memoryStart = process.memoryUsage();
  }

  scriptEnd(name) {
    console.timeEnd(name);
    this.memoryEnd = process.memoryUsage();

    console.log(
      "memory consumed 2nd Call : " +
        (this.memoryEnd.rss - this.memoryStart.rss) / 1024 +
        " KB"
    );
  }

  memoryUsage() {
    const formatMemoryUsage = (data) =>
      `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;
    const memoryData = process.memoryUsage();

    const memoryUsage = {
      rss: `${formatMemoryUsage(
        memoryData.rss
      )} -> Resident Set Size - total memory allocated for the process execution`,
      heapTotal: `${formatMemoryUsage(
        memoryData.heapTotal
      )} -> total size of the allocated heap`,
      heapUsed: `${formatMemoryUsage(
        memoryData.heapUsed
      )} -> actual memory used during the execution`,
      external: `${formatMemoryUsage(
        memoryData.external
      )} -> V8 external memory`,
    };

    console.log(memoryUsage);
  }
}

module.exports = Status;
