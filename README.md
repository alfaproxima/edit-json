# Pre alfa
🔨 Implementation in progress...

Deep pre-alfa.

# Edit JSON
Small zero-dependency library for editing JSON keys and values without reordering.

## Installation


## How to use

## API
```javascript
json = new JsonUpdater({...} | jsonString);

// Add new value
json.add('key', 'value');
// Remove from json
json.remove('key');
// Change key name withou reordering!
json.updateKey('old key', 'new key');
// You can use path to key as parameter
// Next command returns this json:
// {
//     "scripts": {
//         "build:app": "something"
//     }
// }
json.updateKey('scripts.build', 'build:app');
// Change all keys with name "key" in array
json.updateKey('engines[].key', 'newKey');
// Change only first key with name "key" in array
json.updateKey('engines[0].key', 'newKey');
// Update value by path
json.updateValue('scripts.build:app', 'node build.js');
json.updateValue('scripts.build:app', { "name": "John" });
// Build object.
// After making object you still can edit json with JsonUpdater
// But you need to call .toObject() again to commit changes
json.toObject() // returns Object
// Build JSON string
json.toJson() // returns string
```

## License
