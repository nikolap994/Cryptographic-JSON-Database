const SecureJson = require("../../helper/json");
const DB = new SecureJson(
  "test.json",
  "utf-8",
  "aes",
  "bf3c199c2470cb477d907b1e0917c17b",
  "5183666c72eec9e4"
);

DB.write(
  JSON.stringify([
    {
      userId: 2,
      id: 122,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 3,
      id: 33,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 4,
      id: 22,
      title: "delectus aut autem",
      completed: false,
    },
  ])
);

DB.read().then((data) => console.log(data));

DB.remove(["userId", 2]);

DB.find(["title", "delectus aut autem"]).then((data) => console.log(data));

DB.update(
  ["userId", 3],
  [
    ["completed", false],
    ["title", "delectus"],
  ]
);

DB.append({
  userId: 221213121231231231,
  id: 122,
  title: "delectus aut autem",
  completed: false,
});
