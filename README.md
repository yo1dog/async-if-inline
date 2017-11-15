# async-if-inline

Simple inline async if-else control flow.

Easy to use. No dependencies. No `async.waterfall`.

Works exactly the way you expect:

```javascript
 /* sync version */          |    /* async version */
-----------------------------|-------------------------------
 let res;                    |    
 if (shouldDoA) {            |    aif(shouldDoA, cb =>
   res = doThingA(myVar);    |      doThingA(myVar, cb)
 }                           |    )
 else if (shouldDoB) {       |    .elseIf(shouldDoB, cb =>
   res = doThingB(myVar);    |      doThingB(myVar, cb)
 }                           |    )
 else {                      |    .else(cb =>
   res = doThingZ(myVar);    |      doThingZ(myVar, cb)
 }                           |    )
                             |    .finally(res =>
 console.log(res);           |      console.log(res)
                             |    );
```

## Examples:
```javascript
const aif = require('async-if-inline');

// basic example
function printPresents(child) {
  aif     (isChristmas,           cb => getChristmasPresents(chid.name, child.wasNice, cb))
  .elseif (child.isBirthdayToday, cb => getBirthdayPresents(child.name, cb))
  .else   (cb => cb([])) // no presents
  .finally(presents => console.log(presents));
}
```

-----

```javascript
// as many elseIfs as you want
function doTheThing(someVar, topCb) {
  aif    (shouldDoA, cb => doThingA(someVar, cb))
  .elseIf(shouldDoB, cb => doThingB(someVar, cb))
  .elseIf(shouldDoC, cb => doThingC(someVar, cb))
  .elseIf(shouldDoD, cb => doThingD(someVar, cb))
  .elseIf(shouldDoE, cb => doThingE(someVar, cb))
  // ...
  .finally(...args) => {
    // all arguments passed to the statement callbacks are passed through
    // to "finally"
    console.log(args);
  }
}
```

-----

```javascript
// more complex example with error handling
function buyModernVehicle(date, topCb) {
  aif(() => date.time() > new Date('2021-01-01').time(), cb => {
    buyJetpack({color: 'blue', size: 'medium'}, (err, jetpack) => {
      if (err) return cb('Error buying jetpack: ' + err);
      return cb(null, jetpack)
    });
  })
  .else(cb => {
    buyCar({color: 'green', make: 'Ford', model: 'Ranger'}, (err, car) => {
      if (err) return cb('Error buying car: ' + err);
      return cb(null, car);
    });
  })
  .finally((err, vehicle) => {
    if (err) return topCb(err);
    return topCb(null, vehicle);
  });
}
```

## Documentation

### Statements

```javascript
aif     (test, cb => {})
.elseIf (test, cb => {})
.else   (cb => {})
.finally((..args) => {})
```

### Tests

Tests can be any value. If the test is a function, it is executed and the return value is used (so it must be synchronous). Otherwise, the test is used directly. If the value is truethy then the test passes.

```javascript
aif  (true, cb => cb('A'))
.else(      cb => cb('B'))
.finally(res => console.log(res));
// prints A

aif  ('zz', cb => cb('A'))
.else(      cb => cb('B'))
.finally(res => console.log(res));
// prints A

aif  (null, cb => cb('A'))
.else(      cb => cb('B'))
.finally(res => console.log(res));
// prints B

function myFunc() {return true;}
aif  (myFunc, cb => cb('A'))
.else(        cb => cb('B'))
.finally(res => console.log(res));
// prints A

const v = 2;
aif  (() => v < 0, cb => cb('A'))
.else(             cb => cb('B'))
.finally(res => console.log(res));
// prints B
```

### Callbacks

`if`, `elseIf`, and `else` statement execution functions are passed a callback. This callback should be called exactly once. Once the callback is called, the `finally` execution function is called with the same arguments passed to the callback.

```javascript
aif    (true, cb => cb('A', 1))
.elseIf(true, cb => cb('B', null, 2))
.else  (      cb => cb('C', []))
.finally((..args) => console.log(args));
// prints ['A', 1]

aif    (false, cb => cb('A', 1))
.elseIf(true,  cb => cb('B', null, 2))
.else  (       cb => cb('C', []))
.finally((..args) => console.log(args));
// prints ['B', null, 2]

aif    (false, cb => cb('A', 1))
.elseIf(false, cb => cb('B', null, 2))
.else  (       cb => cb('C', []))
.finally((..args) => console.log(args));
// prints ['C', []]
```

### Errors

- If you pass something that is not a function as the statement execution function, an error will be thrown.
- If you call a callback more than once, an error will be thrown.

## Run Tests

```bash
npm test
```