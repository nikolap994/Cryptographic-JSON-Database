# Cryptographic JSON Database

Simple and powerfull tool that allows to encrypt and decrypt data in json database and save it to desired file.

![Logo](https://repository-images.githubusercontent.com/497405780/0aa0c8b3-bb2f-4d70-9bb2-4846d3829a53)

## How to use

```javascript
const SecureJson = require("./helper/json");
const DB = new SecureJson(
    "test.json", // file name 
    "utf-8", // encoding
    "aes", // algorithm used for encryption, other options are des and triple-des
    "bf3c199c2470cb477d907b1e0917c17b", //key
    "5183666c72eec9e4" // initial vector
);
```
- File name can be named with any extension and it will contain only encrypted data.
- Encoding is recommended to use "utf-8"
- Posible encryption standards are aes, des and triple des

If you use AES provide following:
- Key 32 character
- Initial vector 16 character

If you use DES provide following:
- Key 8 character
- Initial vector 8 character

If you use Triple DES provide following:
- Key 24 character
- Initial vector 8 character


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
  JSON.stringify([{
    userId: 10,
    id: 10,
    title: "New title",
    completed: false,
  }])
);
```
