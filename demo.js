var series = require('.');
var jobs =[
    {
        name: 'cloning',
        action: function(next) {
            console.log('git clone');
            setTimeout(function() {
                next(null, 'done cloning');
            }, 1000);
        },
    }, {
        name: 'installing',
        action: function(next) {
            console.log('npm install');
            setTimeout(function() {
                next(null, 'done installing');
            }, 1000);
        }
    }
];

series(jobs).on('data', function(data) {
    console.log(data.result ? data.result : data.job.name + ' ...');
});
