var test = require('tape');
var pp = require('..');

test('should call a single job', function(t) {
    t.plan(1);
    pp([function() {
        t.pass('job was called'); 
    }]).resume();
});

test('should call two jobs in series', function(t) {
    t.plan(3);
    var ctx = {};
    pp([function(next) {
        t.notOk(ctx.second);
        ctx.first = 'hello';
        next();
    }, function(next) {
        t.ok(ctx.first);
        t.notOk(ctx.second);
        ctx.second = 'world';
        next();
    }]).resume();
});

test('should emit data, progress and end events', function(t) {
    t.plan(7);
    var e = pp([
        function(next) {
            next(null, 'hello');
        }, 
        function(next) {
            next(null, 'world');
        }
    ]);
    var events = [];
    e.on('end', function() {
        events.push(arguments);
        t.equal(events.length, 5);
        t.equal(events[0][0].totalJobs, 2);
        t.equal(events[0][0].jobIndex, 0);
        t.equal(events[1][0].result, 'hello');
        t.equal(events[2][0].totalJobs, 2);
        t.equal(events[2][0].jobIndex, 1);
        t.equal(events[3][0].result, 'world');
    });
    e.on('data', function() {events.push(arguments);});
});

test('event should be correct for async jobs too', function(t) {
    t.plan(7);
    var e = pp([
        function(next) {
            setTimeout(function() {next(null, 'foo');}, 200);
        }, 
        function(next) {
            setTimeout(function() {next(null, 'bar');}, 200);
        }
    ]);
    var events = [];
    e.on('end', function() {
        events.push(arguments);
        t.equal(events.length, 5);
        t.equal(events[0][0].totalJobs, 2);
        t.equal(events[0][0].jobIndex, 0);
        t.equal(events[1][0].result, 'foo');
        t.equal(events[2][0].totalJobs, 2);
        t.equal(events[2][0].jobIndex, 1);
        t.equal(events[3][0].result, 'bar');
    });
    e.on('progress', function() {events.push(arguments);});
    e.on('data', function() {events.push(arguments);});
});

test('emits error and skips rest of jobs, if job failed', function(t) {
    t.plan(4);
    var e = pp([
        function(next) {
            next('error', 'hello');
        }, 
        function(next) {
            t.fail('2nd job called');
            next(null, 'world');
        }
    ]);
    var events = [];
    e.on('error', function(data) {
        events.push(data);
        t.equal(events.length, 2);
        t.equal(events[0][0].totalJobs, 2);
        t.equal(events[0][0].jobIndex, 0);
        t.equal(events[1], 'error');
    });
    e.on('data', function() {events.push(arguments);});
});
