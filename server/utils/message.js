var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
}

var generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://www.google.com/maps/@${lat},${long}`,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')

  }
}

module.exports = { generateMessage, generateLocationMessage };
