![](https://coveralls.io/repos/github/abdennour/x-object/badge.svg)
# Overview :

JsDK of Object Class.

#  Methods :


## 1. Object.map( object, (k, v)=>)

- return another object with the same keys , but this same/different values according to the second argument which is callback accepts two arguments.

## 2.Object.filter(object, String|Array|RegExp|function)

   - Retrieve a sub-object of a current object.

   - Examples :

 ```js
  Object.filter({firstname:'Rami', age:23, parent:'Ahmed'}, 'age' );
   // {age:23}

  Object.filter({firstname:'Rami', age:23, parent:'Ahmed'}, ['age','parent'] );
   // {age:23, parent:'Ahmed'}

   Object.filter({firstname:'Rami', lastname:'Toumi', parent:'Ahmed'}, /name$/ );
    // {firstname:'Rami', lastname:'Toumi'}

    Object.filter({fn:'Rami', ln:'Toumi', p:'Ahmed'}, ((k, v) => k == 'fn' || v == 'Ahmed' ));
     // {f:'Rami', parent:'Ahmed'}      

 ```  

## 3.Object.vals(object) :

- As `Object.keys` however it returns the values of keys in arraym not the keys itself.

## 4. Object.belongsTo(childObject, parentObject) :

- It checks if the 1st argument is a sub-object of the 2nd argument.

## 5. Object.equals


- check quality of any two objects even if they are complex.


# Unit tests :


```

  Filter Class
    ✓ contains 4 non-static methods
    ✓ runs "byKey" method prefectly
    ✓ runs "byKeys" method prefectly
    ✓ runs "byRegExp" method prefectly by matching all keys ends with "name"
    ✓ runs "byCallback" method prefectly

  Fitler#execute Method
    ✓ must forwards call to "byKey" whenever the argument is instance of "String class"
    ✓ must forwards call to "byKeys" whenever the argument is instance of "Array Class"
    ✓ must forwards call to "byRegExp" whenever the argument is regular expression
    ✓ must forwards call to "byCallback" whenever the argument is callback
    ✓ must return the same object if no argument is given
    ✓ must throw exception whenever the argument is not belong to one of  the previous classes (String, Array, RegExp, Function)

  Object.map
    ✓ returns an object with the same keys of target object
    ✓ calls the callback for each keys' iteration

  Object.filter
    ✓ returns an object with 1 key whenever the 2nd arg is string & this key is belongs to keys of the target object
    ✓ returns an object with 2 key whenever the 2nd arg is string & keys  belong to keys of the target object

  Object.vals
    ✓ returns an array of object values
    ✓ should forward to built-in api"Object.values" if any

  Object.belongsTo
    ✓ check if the 1st argument is SUB-OBJECT of the 2nd argument

  Object.equals
    ✓ checks the equality of two strings
    ✓ checks the equality of two arrays
    ✓ checks the equality of two literal objects
    ✓ checks the equality of two dates
    ✓ checks the equality of two complex objects


  23 passing (29ms)
```
