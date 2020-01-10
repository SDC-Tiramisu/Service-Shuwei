const faker = require('faker');

const generateId = (context, events, next) => {
  const id = Math.floor(Math.random() * 100 + 1);
  context.vars.id = id;
  next();
};

module.exports = { generateId }
//, generateData