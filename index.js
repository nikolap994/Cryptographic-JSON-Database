const SecureJson = require("./main");
const DB = new SecureJson();

DB.read().then((data) => console.log(data));

// DB.update(
//     ['userId', 1212213],
//     [['completed', true], ['title', 'delectus']]
// );
// DB.append({
// 	"userId": 221213121231231231,
// 	"id": 122,
// 	"title": "delectus aut autem",
// 	"completed": false
// });

// DB.write(JSON.stringify({
// 	"userId": 2,
// 	"id": 122,
// 	"title": "delectus aut autem",
// 	"completed": false
// }));

// DB.printMsg("This is demo msg");

// console.log(DB.name);
