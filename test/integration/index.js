const SecureJson = require("../../helper/json");
const DB = new SecureJson('integration.json');

function jsonFlow() {
    DB.read().then((data) => console.log(data));

    DB.write(
      JSON.stringify([
        {
          userId: 1,
          id: 1,
          title: "Test title 1",
          completed: true,
        },
        {
          userId: 2,
          id: 2,
          title: "Test title 2",
          completed: true,
        },
        {
          userId: 3,
          id: 3,
          title: "Test title 3",
          completed: false,
        },
      ])
    );
    
    DB.append({
      userId: 4,
      id: 4,
      title: "Test title 4",
      completed: true,
    });

    DB.update(
        ["userId", 2],
        [
          ["completed", true],
          ["title", "Updated Test title 2"],
        ]
      );
    
    DB.remove(["userId", 2]);
    
    DB.find(["title", "Test title 4"]).then((data) => console.log(data));
}

jsonFlow();