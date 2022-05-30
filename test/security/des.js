const Status = require("../../helper/report/status");
const Monitor = new Status("DES.json");

Monitor.scriptStart("DES_SETUP");

const config = require("../../config.json");

const DES = require("../../helper/security/DES");

const DES_CLASS = new DES();
const DES_Encryption = DES_CLASS.encrypt(
  "Test text",
  config.DES.ENC_KEY,
  config.DES.IV
);

const DES_Decryption = DES_CLASS.decrypt(
  DES_Encryption,
  config.DES.ENC_KEY,
  config.DES.IV
);

Monitor.scriptEnd("DES_SETUP");
Monitor.memoryUsage();
