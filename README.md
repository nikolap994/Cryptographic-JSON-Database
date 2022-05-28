# JSON Database

Simple and powerfull tool that allows to use json file like a database. It provides collection of methods that you can use like a database query builder.

## How to use

```javascript
const SecureJson = require("./helper/json");
const DB = new SecureJson();
```

It is possible to pass parameters to `new SecureJson(filename, encoding);` such as filename and encoding (include JSON extension to filename).

### Read data from the JSON file

```javascript
DB.read();
```

### Remove data from the JSON file

To remove data, search for entry by passing arguments in array in format `[key, value]`.

```javascript
DB.remove(["userId", 1]);
```

### Find data in the JSON file

To find data in the JSON file add arguments in format `[key, value]`.

```javascript
DB.find(["title", "New title"]);
```

### Update data in the JSON file

To update entry in the JSON file, provide first array in format `[key, value]` to find entry in the JSON and then it is possible to add array of keys and values to update multiple values in the object.

```javascript
DB.update(
  ["userId", 1],
  [
    ["completed", false],
    ["title", "New title"],
  ]
);
```

### Append data to the JSON file

To append data, just call append function and provide object to add to JSON file.

```javascript
DB.append({
  userId: 11,
  id: 10,
  title: "New title",
  completed: false,
});
```

### Write (override) data in the JSON file

Adding new data or overriding is possible to do when calling write function and providing string of data.

```javascript
DB.write(
  JSON.stringify({
    userId: 10,
    id: 10,
    title: "New title",
    completed: false,
  })
);
```
