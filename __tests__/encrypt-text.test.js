const test = require('ava');
const EncryptText = require('../src/encrypt-text');
const mongoose = require('mongoose');
const Mockgoose = require('mock-mongoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const crypto = require('crypto');

const getSha1Hash = (str) => crypto.createHash('sha1').update(str).digest('hex');
test.before(async t => {
  await mockgoose.prepareStorage();
  mongoose.connect('mongodb://localhost/');
  mongoose.connection.on('connected', () => console.log('connected'));
});
test('casts to a sha1 hash', async t => {
  const schema = new mongoose.Schema({
    encrypted_text: EncryptText
  });
  const Test = mongoose.model('Test', schema);
  const data = await Test.create({ encrypted_text: 'test' });
  t.is(data.encrypted_text, getSha1Hash('test'));
});

test('must work with queries', async t => {
  const schema = new mongoose.Schema({
    encrypted_text: EncryptText
  });
  const Test = mongoose.model('TestTwo', schema);
  await Test.create({ encrypted_text: 'test' });
  const foundByPlainText = await Test.findOne({ encrypted_text: 'test' });
  t.truthy(foundByPlainText);
});
test.after(async t => await mockgoose.helper.reset());
