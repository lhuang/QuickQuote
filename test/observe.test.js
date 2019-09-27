import Observe from '../lib/observe';
import {
    quote
} from '../data/specs.json';


let changes = [];
const onChanged = change => changes.push(change);

let obj = {};
Object.assign(obj, quote, {
    calc() {
        console.log(`Call function to get qNumber: ${this.qNumber}`);
    }
});
const __quote = Observe.watch(obj, onChanged, "quote");

describe("object", () => {
    it("new property", () => {
        __quote.customer.middleName = "wu";
        expect(JSON.stringify(changes[0]))
            .toBe(JSON.stringify({
                action: 'create',
                path: 'quote.customer',
                prop: 'middleName',
                value: 'wu',
                type: 'object'
            }));
    });
    it("update property", () => {
        __quote.customer.address.city = "collegeville";
        expect(JSON.stringify(changes[1]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.address',
                prop: 'city',
                newValue: 'collegeville',
                oldValue: 'Philadelphia',
                type: 'object'
            }));
    });
    it("delete property", () => {
        delete __quote.customer.middleName;
        expect(JSON.stringify(changes[2]))
            .toBe(JSON.stringify({
                action: 'delete',
                path: 'quote.customer',
                prop: 'middleName',
                type: 'object'
            }));
    });
});

describe("array", () => {
    it("update content ith element", () => {
        __quote.customer.phones[0] = "123-456-7890";
        expect(JSON.stringify(changes[3]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.phones',
                prop: '0',
                newValue: '123-456-7890',
                oldValue: '215-111-1111',
                type: 'array'
            }));
    });
    it("add an element with push()", () => {
        __quote.customer.phones.push("000-000-0000");
        expect(JSON.stringify(changes[4]))
            .toBe(JSON.stringify({
                action: 'create',
                path: 'quote.customer.phones',
                prop: '2',
                value: '000-000-0000',
                type: 'array'
            }));
    });
    it("delete an element with arry.pop()", () => {
        __quote.customer.phones.pop();
        expect(JSON.stringify(changes[5]))
            .toBe(JSON.stringify({
                action: 'delete',
                path: 'quote.customer.phones',
                prop: '2',
                type: 'array'
            }));
        expect(JSON.stringify(changes[6]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.phones',
                prop: 'length',
                newValue: 2,
                oldValue: 3,
                type: 'array'
            }));
    });
    it("delete an element by array.shift()", () => {
        __quote.customer.phones.shift();
        expect(JSON.stringify(changes[7]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.phones',
                prop: '0',
                newValue: '610-111-0000',
                oldValue: '123-456-7890',
                type: 'array'
            }));
        expect(JSON.stringify(changes[8]))
            .toBe(JSON.stringify({
                action: 'delete',
                path: 'quote.customer.phones',
                prop: '1',
                type: 'array'
            }));
        expect(JSON.stringify(changes[9]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.phones',
                prop: 'length',
                newValue: 1,
                oldValue: 2,
                type: 'array'
            }));
    });
    it("add an element with arry.unshift()", () => {
        __quote.customer.phones.unshift("000-000-000");
        expect(JSON.stringify(changes[10]))
            .toBe(JSON.stringify({
                action: 'create',
                path: 'quote.customer.phones',
                prop: '1',
                value: '610-111-0000',
                type: 'array'
            }));
        expect(JSON.stringify(changes[11]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.customer.phones',
                prop: '0',
                newValue: '000-000-000',
                oldValue: '610-111-0000',
                type: 'array'
            }));
    });
    it("update ith element property", () => {
        __quote.items[0].quantity = 100;
        expect(JSON.stringify(changes[12]))
            .toBe(JSON.stringify({
                action: 'update',
                path: 'quote.items.0',
                prop: 'quantity',
                newValue: 100,
                oldValue: 5,
                type: 'object'
            }));
    });
});