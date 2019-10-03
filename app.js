const observable = require("./src/observable");

let quote = {};
quote = observable(quote);
//

quote.watch(msg => {
    //console.dir(msg, { depth: null, colors: true });
});
quote.watch(evt => {
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

quote.qnumber = "123546778";
quote.id = 20;
quote.timestamp = new Date();
quote.customer = {};
quote.customer = null;

quote.items = [];
quote.items.push({});
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