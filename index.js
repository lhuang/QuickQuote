const queue = require("./src/task-queue");

console.log('concurrency of 2');
const _queue = queue(2);

//_queue.push(task1);
//_queue.push(task2);
//_queue.push(task3);
// 1
// 2
// 3

setInterval(() => {
    const tasks = [
        done => setTimeout(_ => { console.log({ A: Date.now() }); done(); }, 100),
        done => setTimeout(_ => { console.log({ B: Date.now() }); done(); }, 50),
        done => setTimeout(_ => { console.log({ C: Date.now() }); done(); }, 25),
    ];
    for (let task of tasks) {
        _queue.push(task);
    };
    console.log("--------------------");
}, 3000);