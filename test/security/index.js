const Status = require("../../helper/report/status");
const Monitor = new Status("AES.json");

Monitor.scriptStart("AES_SETUP");

const config = require("../../config.json");

const AES = require("../../helper/security/aes");

const AES_CLASS = new AES();
const AES_Encryption = AES_CLASS.encrypt(
  "Test text",
  config.AES.ENC_KEY,
  config.AES.IV
);

const AES_Decryption = AES_CLASS.decrypt(
  AES_Encryption,
  config.AES.ENC_KEY,
  config.AES.IV
);

Monitor.scriptEnd("AES_SETUP");
Monitor.memoryUsage();
