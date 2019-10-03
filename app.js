const observable = require("./src/observable");

let obj = {};
obj = observable(obj);
//

obj.watch(msg => {
    console.dir(msg, { depth: null, colors: true });
});
/*
obj.watch(evt => {
    switch (evt.action) {
        case "edit":
            if (evt.type !== "object" && evt.type !== "array") {
                console.dir(evt, { depth: null, colors: true });
            }
            break;
        case "add":

            break;
        case "remove":

            break;
    }
});
*/
obj.qnumber = "123546778";
obj.id = 20;
obj.timestamp = new Date();
obj.customer = {};
obj.customer = null;

obj.items = [];
obj.items.push({});
obj.items[0].name = "Huawei mate 30";
obj.items[0].price = 999.99;
obj.items[0].quantity = 10;

obj.items.push({
    name: "Samsung 10",
    price: 899.99,
    quantity: 1
});

obj.items.unshift({
    name: "IPhone 7",
    price: 499.99,
    quantity: 7
}, {
    name: "IPhone 8",
    price: 599.99,
    quantity: 8
});

obj.items[1].quantity = 50;

obj.items[2].items = [];
obj.items[2].items.push({
    name: "charger",
    price: 99.99,
    quantity: 10
});
obj.items[2].items.push({
    name: "connector",
    price: 49.99,
    quantity: 30
});
obj.items[3].items = [];
obj.items[3].items.push({
    name: "ear bug",
    price: 19.99,
    quantity: 100
});

console.dir(obj.items, { depth: null, colors: true });
obj.items.shift();
console.dir(obj.items, { depth: null, colors: true });
obj.items.pop();
console.dir(obj.items, { depth: null, colors: true });
obj.items.shift();
console.dir(obj.items, { depth: null, colors: true });
