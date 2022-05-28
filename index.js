const SecureJson = require("./helper/json");
const DB = new SecureJson();

DB.read().then((data) => console.log(data));

// DB.remove(['userId', 125125125]);

// DB.find(['title', 'delectus aut autem']).then((data) => console.log(data));

// DB.update(
//     ['userId', 1241251],
//     [['completed', false], ['title', 'delectus']]
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
