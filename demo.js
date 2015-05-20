var series = require('.');

function clone(next) {
    console.log('git clone');
    setTimeout(function() {
        next(null, 'done cloning');
    }, 1000);
}

function install(next) {
    console.log('npm install');
    setTimeout(function() {
        next(null, 'done installing');
    }, 1000);
}

clone.title = 'cloning';
install.title = 'installing';

series([clone, install]).on('data', function(data) {
    console.log(data.jobFinished ? data.result : data.job.title + ' ...');
});
