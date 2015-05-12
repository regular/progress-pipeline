progress-pipeline
===
Like async.series, but with a readable-stream interface for getting progress events.

```
npm install progress-pipeline
```

Usage
---
```
var series = require('progress-pipeline');
var jobs =[
    {
        name: 'cloning',
        action: function(cb) {
            gitClone(user + '/' + repo, function(err) {
                cb(null, 'done cloning');
            });
        },
    }, {
        name: 'installing',
        action: function(cb) {
            shell('cd '+ repo +' && npm install', function(err) {
                cb(null, 'done installing');
            });
        }
    }
];

series(context, jobs).on('data', function(data) {
    console.log(data.result ? data.result : data.job.name + ' ...');
});
```

output:
```
cloning ...
done cloning
installing ...
done installing
```
