const SecureJson = require("./main");
const DB = new SecureJson();

DB.read();
// DB.write(JSON.stringify({
// 	"userId": 2,
// 	"id": 122,
// 	"title": "delectus aut autem",
// 	"completed": false
// }));
// DB.printMsg("This is demo msg");
// console.log(DB.name);
