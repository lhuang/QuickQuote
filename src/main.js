import Observe from '../lib/observe';
import {
    quote
} from '../data/specs.json';

// 
console.log("----------------------------------- original");
console.log(quote);
//
const onChanged = res => console.log(res);
// Subscribe to Observr the object
let obj = {};
Object.assign(obj, quote, {
    "id": "",
    calc() {
        console.log(`Call function to get qNumber: ${this.qNumber}`);
    }
});
console.log("-----------------------------------> add function");
console.log(obj);
obj = Observe.watch(obj, onChanged, "quote");
console.log("-----------------------------------> watch");
console.log(obj);
// Object property operations
console.log("------------- update property");
obj.customer.firstName = "shilu";
console.log("------------- new property");
obj.customer.middleName = "wu";
console.log("------------- update child object's property");
obj.customer.address.city = "collegeville";
// Array operations
console.log("------------- update array element content");
obj.customer.phones[0] = "123-456-7890";
console.log("------------- add array element by array.push() ");
obj.customer.phones.push("000-000-0000");
console.log("------------- delete carray element by array.pop() ");
obj.customer.phones.pop();
console.log("------------- delete array element by array.shift()");
obj.customer.phones.shift();
console.log("------------- add element by array.unshift()");
obj.customer.phones.unshift("000-000-000");

// Object from array operations
console.log("------------- update collected object's property");
obj.items[0].quantity = 100;
console.log("------------- add object to array array.push()");
obj.items.push({
    "name": "Huawei Mate 30",
    "uniPrice": 999.99,
    "quantity": 50
});
console.log("------------- delete object from array array.pop()");
obj.items.pop();
console.log("------------- function call");
obj.calc();
console.log("------------- delete property");
delete obj.id;
delete obj.customer.middleName;

obj = Observe.unwatch(obj); //
console.log("<----------------------------------- unwatch");
console.log(obj);