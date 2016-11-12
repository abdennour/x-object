const services = require('./services');
((_O,metaClass)=>{
  _O.map=function(obj,fn){
      var oo={};
      _O.keys(obj).map(function(k, i) {
           oo[k] = fn.call(obj,k, obj[k]);
       });
      return oo;
   };

   _O.filter = function (obj, filterHandler) {
      return new services.Filter(obj).execute(filterHandler);
   };
   _O.vals=(o)=>(typeof _O.values ==='function')? _O.values(o):_O.keys(o).map((k)=>o[k]);

   _O.belongsTo=(small,big)=>_O.keys(small).every((k)=>(_O.equals(big[k],small[k])));
   _O.equals = function(x, y) {
          if (x === y)
              return true;
          // if both x and y are null or undefined and exactly the same

          if (!(x instanceof Object) || !(y instanceof Object))
              return false;
          // if they are not strictly equal, they both need to be Objects
          if (x.valueOf() === y.valueOf())
              return true
          if (x.constructor !== y.constructor)
              return false;
          // they must have the exact same prototype chain, the closest we can do is
          // test there constructor.

        for (var p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            // other properties were tested using x.constructor === y.constructor

            if (!y.hasOwnProperty(p))
                return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if (x[ p ] === y[ p ])
                continue;
            // if they have the same strict value or identity then they are equal

            if (typeof (x[ p ]) !== "object")
                return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if (!_O.equals(x[ p ], y[ p ]))
                return false;
            // Objects and Arrays must be tested recursively
        }

        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
            // allows x[ p ] to be set to undefined
        }
        return true;
    }


})(Object,Object.prototype)
