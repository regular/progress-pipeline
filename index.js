var from2 = require('from2');

// jobs is an array of {name: String, action: function(next) }
// returns a Stream that emits 2 data events per job
//   emits 'data', {job: {}, totalJobs: n, jobIndex: n}
//   emits 'data', {result: <job's result>}

module.exports = function(jobs) {
    var totalJobs = jobs.length;
    var jobIndex = 0;
    return from2.obj(function read(size, next) {
        if (jobs.length <= 0) return this.push(null);
        var job = jobs.shift();
        this.push({
            job: job,
            totalJobs: totalJobs,
            jobIndex: jobIndex++
        });
        job.action(function(err, data) {
            next(err, {job:job, result: data});
        });
    });
};
