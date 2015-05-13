progress-pipeline
===
Like async.series, but with a readable-stream interface for getting progress events.

```
npm install progress-pipeline
```

Usage
---
``` javascript
var series = require('progress-pipeline');

var jobs =[
    function cloning(cb) {
        gitClone(user + '/' + repo, function(err) {
            cb(err, 'done cloning');
        });
    },
    function installing(cb) {
        shell('cd '+ repo +' && npm install', function(err) {
            cb(err, 'done installing');
        });
    }
];

series(jobs).on('data', function(data) {
    console.log(data.result ? data.result : data.jobIndex + '/' + data.totalJobs + data.job.name + ' ...');
});
```

output:
```
0/2 cloning ...
done cloning
1/2 installing ...
done installing
```
