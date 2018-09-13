# mongoose-encrypt-text

Mongoose Schema Type for storing encrypted (sha1 hash) text

## Usage

```javascript
const EncryptedText = require('mongoose-encrypt-text');
const mongoose = require('mongoose');

const MySchema = new mongoose.Schema({
  encrypted_text: EncryptText
});
const MyModel = mongoose.model('MyModel', MySchema);

MyModel.create({ encrypted_text: 'test' }).then((doc) => {
  console.log(doc.encrypted_text) // 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
})
```