import obsevable from '../src/observable';
import {
    quote
} from './data.json';


let changes = [];

let obj = {};
Object.assign(obj, quote, {
    calc() {
        return this.qNumber;
    }
});

obj = obsevable(obj);
obj.watch(change => changes.push(change));

describe("observe state changes: ", () => {
    it("string property", () => {
        obj.customer.lastName = "wu";
        expect(changes[0].path).toBe(".customer.lastName");
        expect(changes[0].value[0].newValue).toBe("wu");
    });
    it("number property", () => {
        obj.customer.address.block = 987;
        expect(changes[1].path).toBe(".customer.address.block");
        expect(changes[1].value[0].newValue).toBe(987);
    });
    it("edit items[0] price", () => {
        obj.items[0].price = 1000.00;
        expect(changes[2].path).toBe(".items.0.price");
        expect(changes[2].value[0].newValue).toBe(1000.00);
    });
    it("remove an item by pop", () => {
        obj.items.pop();
        expect(changes[3].path).toBe(".items");
        expect(changes[3].value[0].name).toBe("MacBook Pro");
    });
    it("add an item by unshift", () => {
        obj.items.push(
            {
                "name": "Samsung 11",
                "price": 999.99,
                "quantity": 2,
                "items": []
            }
        );
        expect(changes[4].path).toBe(".items");
        expect(changes[4].value[0].name).toBe("Samsung 11");
    });
    it("edit items[0] unitPrice", () => {
        let last = obj.items.length - 1;
        obj.items[last].price = 2000.00;
        expect(changes[5].path).toBe(".items.1.price");
        expect(changes[5].value[0].newValue).toBe(2000.00);
    });
});