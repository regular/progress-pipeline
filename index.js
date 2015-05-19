var from2 = require('from2');

// jobs is an array of function(next)
// returns a Stream that emits 2 data events per job
//   emits 'data', {job: <function>, totalJobs: <n>, jobIndex: <n>}
//   emits 'data', {job: <function>, result: <job's result (as passed to next as 2nd argument>}

module.exports = function(jobs) {
    var totalJobs = jobs.length;
    var jobIndex = 0;
    return from2.obj(function read(size, next) {
        if (jobs.length <= 0) return this.push(null);
        var job = jobs.shift();
        this.push({
            job: job,
            totalJobs: totalJobs,
            jobIndex: jobIndex
        });
        job(function(err, data) {
            next(err, {
                job:job, 
                totalJobs: totalJobs,
                jobIndex: jobIndex++,
                result: data
            });
        });
    });
};
