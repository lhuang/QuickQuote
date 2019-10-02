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

/*
const factory = require("./src/objectFactory");

const fn = factory();
let _quote = fn.create("quote");
_quote = observable(_quote);
//

_quote.watch(msg => {
    console.dir(msg, { depth: null, colors: true });
});
//
_quote.customer = fn.create("account");
_quote.customer.company = "Essence Solution";
_quote.customer.address.street = "1714 Osprey Deive";
_quote.customer.address.city = "Norristown";
_quote.customer.address.state = "PA";
_quote.customer.address.zip = "19403";
_quote.customer = {};
_quote.customer = fn.create("account");
_quote.customer.company = "Solution";

let temp = fn.create("item");
_quote.items.push({
    container: "",
    name: "IPhone 11",
    description: "",
    price: 999.99,
    quantity: 10,
    discount: "",
    items: [],
});


_quote.items[0].name = "IPhone 10";
_quote.items[0].price = 899.99;
_quote.items[0].quantity = 1;

_quote.items[0].items.push(temp);
_quote.items[0].items[0].name = "Samsung 11";
_quote.items[0].items[0].price = 899.99;
_quote.items[0].items[0].quantity = 2;

temp = fn.create("item");
_quote.items.push(temp);
_quote.items[1].name = "IPhone 10";
_quote.items[1].price = 899.99;
_quote.items[1].quantity = 1;

temp = fn.create("item");
_quote.items[0].items.push(temp);
_quote.items[0].items[0].name = "Samsung 11";
_quote.items[0].items[0].price = 899.99;
_quote.items[0].items[0].quantity = 2;

_quote.items.push({
    name: "Samsung 11",
    price: 899.99,
    quantity: 2
});

_quote.items[1].price = 799.99;
_quote.items[0].items.push({
    name: "Connector",
    price: 19.99,
    quantity: 354
});
_quote.items[0].items[0].price = 29.99;
*/