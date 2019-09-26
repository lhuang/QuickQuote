require("node-json-color-stringify");
const {
    Observable
} = require("../lib/observable");

const user = require("../data/user.json");
console.log(JSON.colorStringify(user, null, 3));
const {
    order
} = require("../data/user.json");

let
    observableOrder = Observable.from(order);
// Subscribe
observableOrder.observe((changes => {
    changes.forEach(change => {
        console.log(change);
    });
}));
observableOrder.ammount = 7;
observableOrder.items.push({
    "type": "gun",
    "pid": 106,
    "ammount": 50,
    "remark": "keep me"
});

const {
    array
} = require("../data/user.json");
let observableA = Observable.from(array);
observableA.observe(changes => {
    changes.forEach(change => {
        console.log(change);
    });
});
observableA.pop();

observableA.push('a', 'b');
/*
observableOrder.address = {
    street: 'Str 75',
    apt: 29
};
delete observableOrder.remark;

let a = [1, 2, 3, 4, 5],
    observableA = Observable.from(a);

observableA.observe(changes => {
    changes.forEach(change => {
        console.log(change);
    });
});

observableA.pop();

observableA.push('a', 'b');

let oUser = Observable.from(user);

oUser.observe(changes => {
    console.log("path: ");
    changes.forEach(change => {
        console.log(change);
    });
}, {
    path: 'firstName'
});

oUser.observe(changes => {
    console.log("pathFrom: ");
    changes.forEach(change => {
        console.log(change);
    });
}, {
    pathsFrom: 'address'
});

oUser.lastName = "Huang";
oUser.firstName = "Lu";
oUser.address.city = "Collegeville";
*/