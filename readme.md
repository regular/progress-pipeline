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
var context = {
    user: 'regular',
    repo: 'progress-pipeline'
};
var jobs =[
    {
        name: 'cloning',
        action: function(ctx, cb) {
            gitClone(ctx.user + '/' + ctx.repo, function(err) {
                cb(null, 'result2');
            });
        },
    }, {
        name: 'installing',
        action: function(ctx, cb) {
            shell('cd '+ ctx.repo +' && npm install', function(err) {
                cb(null, 'result2');
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
result1
installing ...
result2
```
