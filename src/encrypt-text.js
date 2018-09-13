
const mongoose = require('mongoose');
const crypto = require('crypto');


class EncryptText extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, 'EncryptText');
  }
  _encrypt(value) {
    return crypto.createHash(EncryptText.algorithm).update(value).digest('hex');
  }
  cast(value) {
    return this._encrypt(value);
  }
}

EncryptText.instance = 'EncryptText';
EncryptText.algorithm = 'sha1';
mongoose.Schema.Types.EncryptText = EncryptText;
module.exports = EncryptText;