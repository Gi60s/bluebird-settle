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