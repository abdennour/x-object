require('../index');
const sinon = require('sinon');
const expect = require('expect');

describe(`Object.map`, () => {
 let context = {
  ahmed: [80, 90, 60],
  rami: [44, 55, 79],
  sami: [98, 91, 94],
  mohamed: [92, 99, 60]
 };
 it(`returns an object with the same keys of target object`, () => {
  let callback = (k, v) => v.reduce((a, b) => a + b, 0);
  let newObject = Object.map(context, callback);
  expect(Object.keys(newObject)).toEqual(Object.keys(context));
  expect(newObject.rami).toNotEqual(context.rami);
 });
 it(`calls the callback for each keys' iteration`, () => {
  let callback = sinon.spy();
  Object.map(context, callback);
  let actualCalls = callback.callCount;
  let expectedCalls = Object.keys(context).length;
  expect(actualCalls).toEqual(expectedCalls)
 });
});

describe(`Object.filter`, () => {
 let context = {
  firstname: 'Abdennour',
  lastname: 'TOUMI',
  age: 27
 };
 it(`returns an object with 1 key whenever the 2nd arg is string & this key is belongs to keys of the target object`, () => {
  let newObj = Object.filter(context, 'firstname');
  let actual = Object.keys(newObj).length;
  let expected = 1;
  expect(actual).toEqual(expected);
 });

 keysAfterFilter = ['firstname', 'lastname']
 it(`returns an object with ${keysAfterFilter.length} key whenever the 2nd arg is string & keys  belong to keys of the target object`, () => {
  let newObj = Object.filter(context, keysAfterFilter);
  let actual = Object.keys(newObj).length;
  let expected = keysAfterFilter.length;
  expect(actual).toEqual(expected);
 });

});

describe(`Object.vals`, () => {
 let now = Date.now();
 let context = {
  now,
  fl: 'fd'
 };
 it(`works fine`, () => {
  let returned = Object.vals(context);
  expect(returned[1]).toEqual(context.fl);
 })
 it(`returns an array of object values with a size equals to keys size`, () => {
  let returned = Object.vals(context);
  expect(returned).toBeAn(Array);
  expect(returned.length).toEqual(Object.keys(context).length);
 });

});
describe(`Object.belongsTo`, () => {
 it(`check if the 1st argument is SUB-OBJECT of the 2nd argument`, () => {
  let st = {
   a: 5,
   c: 35
  };
  let st_1 = {
   a: 4,
   c: 3
  };
  let st_2 = {
   a: 5,
   c: 35,
   h: "because this"
  };
  let nd = {
   b: 5,
   a: 5,
   c: 35,
   d: 40,
   now: Date.now(),
   ui: {}
  };
  expect(Object.belongsTo(st, nd)).toEqual(true);
  expect(Object.belongsTo(st_1, nd)).toEqual(false);
  expect(Object.belongsTo(st_2, nd)).toEqual(false);
 })

});
describe(`Object.equals`, () => {

 it(`checks the equality of two strings`, () => {
  let first = 'abcdef';
  let second = 'abcdef';
  let anti = 'fddgdf';
  expect(Object.equals(first, second)).toBeTruthy();
  expect(Object.equals(first, anti)).toBeFalsy();
 });

 it(`checks the equality of two arrays`, () => {
  let first = ['abc', 'ojk', {
   yy: 4
  }];
  let second = ['abc', 'ojk', {
   yy: 4
  }];
  let anti = ['x', 'ojk', {
   yy: 4
  }];
  expect(Object.equals(first, second)).toBeTruthy();
  expect(Object.equals(first, anti)).toBeFalsy();
 });

 it(`checks the equality of two literal objects`, () => {
  let first = {
   name: 'Ahmed',
   social: {
    tw: "@ahmed",
    fb: "@ahmed"
   }
  };
  let second = {
   name: 'Ahmed',
   social: {
    tw: "@ahmed",
    fb: "@ahmed"
   }
  };;
  let anti = {
   name: 'Ahmed',
   social: {
    tw: "@xxxxxxxxx",
    fb: "@ahmed"
   }
  };;
  expect(Object.equals(first, second)).toBeTruthy();
  expect(Object.equals(first, anti)).toBeFalsy();
 });

 it(`checks the equality of two dates`, () => {
  let first = new Date(`1989/10/29`);
  let second = new Date(`1989/10/29`);
  let anti = Date.now();
  let anti2 = () => {};
  expect(Object.equals(first, second)).toBeTruthy();
  expect(Object.equals(first, anti)).toBeFalsy();
  expect(Object.equals(first, anti2)).toBeFalsy();
 });

 it(`checks the equality of two complex objects`, () => {
  let getComplexObject = () => [
   [1, 2, 3], {
    are: "you here"
   }, {
    birth: new Date(`1989/10/29`),
    other: {
     school: "7nov",
     university: "Insat"
    }
   }
  ];
  let first = getComplexObject();
  let second = getComplexObject();
  let anti = [
   [1, 2, 3], {
    are: "you here",
    be: "there"
   }
  ];
  class Custom {
   constructor(are, be) {
    this.are = are;
    this.be = be;
    return this;
   }
  }
  let anti2 = [
   [1, 2, 3], new Custom('you here')
  ];
  expect(Object.equals(first, second)).toBeTruthy();
  expect(Object.equals(first, anti)).toBeFalsy();
  expect(Object.equals(first, anti2)).toBeFalsy();
 });

});
