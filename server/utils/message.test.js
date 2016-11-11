const mocha = require('mocha');
const chai = require('chai');
var expect = chai.expect;
var { generateMessage, generateLocationMessage } = require('./message')

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

describe('generate Location Message', () => {

  it('should generate correct location message', () => {
    var from = 'Admin'
    var lat = 1
    var long = 1
    var createdAt = new Date().getTime()
    var message = generateLocationMessage(from, lat, long)
      expect(message.from).to.be.a('string')
      expect(message.createdAt).to.be.a('number')
      expect(message.url).to.equal('https://www.google.com/maps/@1,1')
  })


})
