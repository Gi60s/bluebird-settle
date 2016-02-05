# bluebird-settle

Add the settle method to the bluebird 3.x library.

## Important!

You're project must already have bluebird installed via npm. This module will not include bluebird for you, but it will add the settle method to any version of bluebird that you are using.
  
## Usage

```js
var Promise = require('bluebird-settle');

var promises = [
   Promise.resolve(true),
   Promise.resolve('Yes'),
   Promise.reject(new Error('Foo'))
];

Promise.settle(promises)
    .then(function(results) {
        results.forEach(function(result) {
            if (result.isRejected()) {
                console.log('Rejected with reason: ' + result.reason());
            } else if (result.isResolved()) {
                console.log('Resolved with value: ' + result.value());
            }
        });
    });
    
/*
Sample Output

Resolved with value: true
Resolved with value: Yes
Rejected with reason: Error: Foo
*/
```

## Side Note

You only need to require the `bluebird-settle` library once. You can require it over and over if you want, but you only have to require it once. For example:

**index.js**

```js
require('bluebird-settle');
var foo = require('./foo');
...
```

**foo.js**

```js
var Promise = require('bluebird');
console.log(typeof Promise.settle === 'function');      // true
...
```