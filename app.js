const observable = require("./src/observable");

let quote = {};
quote = observable(quote);
//

quote.watch(msg => {
    console.dir(msg, { depth: null, colors: true });
});

//_quote.qnumber = "123546778";
quote.id = 20;

quote.items = [];
quote.items.push({
});
quote.items[0].name = "Huawei mate 30";
quote.items[0].price = 999.99;
quote.items[0].quantity = 10;

quote.items.push({
});
quote.items[1].name = "Samsung 10";
quote.items[1].price = 899.99;
quote.items[1].quantity = 1;

quote.items.unshift({
    name: "IPhone 10",
    price: 799.99,
    quantity: 3
}, {
    name: "IPhone 9",
    price: 699.99,
    quantity: 5
});

quote.items[3].quantity = 50;

const objectF = require("./src/objectFactory");

const account = objectF.create("account");

console.dir(account, { depth: null, colors: true });