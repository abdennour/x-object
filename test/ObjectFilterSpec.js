const {
 Filter
} = require('../services');
const sinon = require('sinon');
const expect = require('expect');
const filter = new Filter({
 firstname: 'Abdennour',
 lastname: 'TOUMI',
 age: 27
});
describe(`Filter Class`, () => {

 it(`contains 4 non-static methods`, () => {

  expect(typeof filter.byKey).toEqual('function');
  expect(typeof filter.byKeys).toEqual('function');
  expect(typeof filter.byRegExp).toEqual('function');
  expect(typeof filter.byCallback).toEqual('function');

 });
 it(`runs "byKey" method prefectly`, () => {
  let newObject = filter.byKey('firstname');
  expect(newObject.firstname).toEqual(filter.object.firstname);
  expect(newObject.lastname).toNotExist();
  expect(newObject.age).toNotExist();
 });
 it(`runs "byKeys" method prefectly`, () => {
  let keys = ['firstname', 'age'];
  let newObject = filter.byKeys(keys);
  expect(newObject.firstname).toEqual(filter.object.firstname);
  expect(newObject.lastname).toNotExist();
  expect(newObject.age).toEqual(filter.object.age);
 });
 it(`runs "byRegExp" method prefectly by matching all keys ends with "name"`, () => {
  let regxp = /name$/;
  let newObject = filter.byRegExp(regxp);
  expect(newObject.firstname).toEqual(filter.object.firstname);
  expect(newObject.lastname).toEqual(filter.object.lastname);
  expect(newObject.age).toNotExist();

 });
 it(`runs "byCallback" method prefectly`, () => {
  let filterFn = ((key, val) => key === 'firstname' || val === 'TOUMI');
  let newObject = filter.byCallback(filterFn);
  expect(newObject.firstname).toEqual(filter.object.firstname);
  expect(newObject.lastname).toEqual(filter.object.lastname);
  expect(newObject.age).toNotExist();
 });

});

describe(`Fitler#execute Method`, () => {
 it(`must forwards call to "byKey" whenever the argument is instance of "String class" `, () => {
  let method = sinon.spy(Filter.prototype, "byKey");
  filter.execute('g');
  expect(method.calledOnce).toBeTruthy();
  method.restore();
 });
 it(`must forwards call to "byKeys" whenever the argument is instance of "Array Class"`, () => {
  let method = sinon.spy(Filter.prototype, "byKeys");
  filter.execute(['g']);
  expect(method.calledOnce).toBeTruthy();
  method.restore();
 });

 it(`must forwards call to "byRegExp" whenever the argument is regular expression`, () => {
  let method = sinon.spy(Filter.prototype, "byRegExp");
  filter.execute(/abcgfgf/);
  expect(method.calledOnce).toBeTruthy();
  method.restore();
 });

 it(`must forwards call to "byCallback" whenever the argument is callback`, () => {
  let method = sinon.spy(Filter.prototype, "byCallback");
  filter.execute(() => {});
  expect(method.calledOnce).toBeTruthy();
  method.restore();
 });
 it(`must return the same object if no argument is given`, () => {
  let newObject = filter.execute();
  expect(newObject).toEqual(filter.object);
 });

 it(`must throw exception whenever the argument is not belong to one of  the previous classes (String, Array, RegExp, Function)`, () => {
  class ACustomClass {};

  expect(() => filter.execute(new ACustomClass())).toThrow();
 });


})
