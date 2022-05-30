const Status = require("../../helper/report/status");
const Monitor = new Status("Triple-DES.json");

Monitor.scriptStart("TRIPLE_DES_SETUP");

const config = require("../../config.json");

const TRIPLE_DES = require("../../helper/security/tiple-des");

const TRIPLE_DES_CLASS = new TRIPLE_DES();
const TRIPLE_DES_Encryption = TRIPLE_DES_CLASS.encrypt(
  "Test text",
  config.TRIPLE_DES.ENC_KEY,
  config.TRIPLE_DES.IV
);

const TRIPLE_DES_Decryption = TRIPLE_DES_CLASS.decrypt(
  TRIPLE_DES_Encryption,
  config.TRIPLE_DES.ENC_KEY,
  config.TRIPLE_DES.IV
);

Monitor.scriptEnd("TRIPLE_DES_SETUP");
Monitor.memoryUsage();
