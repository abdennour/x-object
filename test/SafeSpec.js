const sinon = require('sinon');
const expect = require('expect');
const clearAddedMethods = require('../index');
describe(`Safe Import`, () => {

 it(`prevents the Object class from extension`, () => {
  clearAddedMethods();
  const beforeImport = Object.getOwnPropertyNames(Object);
  require('../safe');
  const afterImport = Object.getOwnPropertyNames(Object);
  expect(afterImport).toEqual(beforeImport);
 });

 it(`extends the Object class whenever "x-object" is imported`, () => {
  clearAddedMethods();
  const beforeImport = Object.getOwnPropertyNames(Object);
  require('../index');
  setTimeout(() => {
   const afterImport = Object.getOwnPropertyNames(Object);
   expect(afterImport).toNotEqual(beforeImport);
  }, 100);

 });
})
