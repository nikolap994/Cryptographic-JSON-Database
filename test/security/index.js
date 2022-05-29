
const Status = require("../Status");
const Monitor = new Status();

Monitor.scriptStart("AES_SETUP");


const config = {
  AES: {
    ENC_KEY: "bf3c199c2470cb477d907b1e0917c17b",
    IV: "5183666c72eec9e4",
  },
  DES: {
    ENC_KEY: "bf3c199c2470cb477d907b1e0917c17b",
    IV: "5183666c72eec9e4",
  },
  TRIPLE_DES: {
    ENC_KEY: "123456000000000000000000",
    IV: "12345678",
  },
};

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

console.log(">>> AES DECRYPTION: " + AES_Decryption);

Monitor.scriptEnd("AES_SETUP");
Monitor.memoryUsage();