class Filter {

 constructor(object) {
  this.object = object;
 }

 start(handler) {
   if (typeof handler === 'string') {
    return this.byKey(...arguments);
   } else if (typeof handler === 'function') {
    return this.byCallback(...arguments);
   } else if (typeof handler === 'object') {
    if (handler.constructor === Array) {
     return this.byKeys(...arguments);
    } else if (handler.constructor === RegExp) {
     return this.byRegExp(...arguments);
    }
   }
   return this.object;
  }
  /**
   * @param {array} keys
   */
 byKeys(keys = []) {
  return keys.reduce((a, b) => Object.assign(a, eval(`({'${b}':this.object['${b}']})`)), {});
 };

 /**
  * @param {string} key
  */
 byKey(key) {
  return this.object[key];
 }

 /**
  * @param {RegExp} regxp
  */
 byRegExp(regxp) {
  return this.byKeys(Object.keys(this.object).filter(k => regxp.test(k)));
 }

 /**
  * @param {function} callback
  */
 byCallback(callback) {
  this.byKeys(Object.keys(this.object).filter(k => callback(k, this.object[k])));
 }


}

module.exports = Filter;
