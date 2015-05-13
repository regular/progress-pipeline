progress-pipeline
===
Like async.series, but with a readable-stream interface for getting progress events.

Installation
---
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

Job Functions
---
Jobs are regular, node-style async functions, e.g. they are being called with an [error-first callback](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/) and are required to call that callback with an error and an optional result argument.

_Note_ You can add properties to the job functions before putting them into the pipeline and you will have access to these prperties in your on('data') event handler. See [demo.js](./demo.js) for an example.

Events
---
You get two `data` events per job

* one when the job has started
```
{
    job: <the job-function you provided>
    jobIndex: <zero-based index of this job>
    totalJobs: <total number of jobs in the pipeline>
}
```

* and one when the job has finished
```
{
    job: <the job-function you provided>
    result: <the job's result>
}
```
