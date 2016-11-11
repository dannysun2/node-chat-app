const mocha = require('mocha');
const chai = require('chai');
var expect = chai.expect;
var { generateMessage } = require('./message')

describe('generate Message', () => {

  it('should generate correct message object', () => {
    // store res in variable
    // asset from matchs value
    // asset text matchs
    // assert createdAt is a number
    var from = 'Danny'
    var text = 'Hi there';

    var message = generateMessage(from, text)

    var createdAt = new Date().getTime()
      expect(message.from).to.be.a('string');
      expect(message.text).to.be.a('string');
      expect(message.createdAt).to.be.a('number');

      expect(message).to.include.keys('from', 'text', 'createdAt');
  })


})
