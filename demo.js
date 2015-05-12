var series = require('.');
var context = {
    user: 'regular',
    repo: 'progress-pipeline'
};
var jobs =[
    {
        name: 'cloning',
        action: function(ctx, next) {
            console.log('git clone ' + ctx.user + '/' + ctx.repo);
            setTimeout(function() {
                next(null, 'done cloning');
            }, 1000);
        },
    }, {
        name: 'installing',
        action: function(ctx, next) {
            console.log('cd '+ ctx.repo +' && npm install');
            setTimeout(function() {
                next(null, 'done installing');
            }, 1000);
        }
    }
];

series(context, jobs).on('data', function(data) {
    console.log(data.result ? data.result : data.job.name + ' ...');
});
