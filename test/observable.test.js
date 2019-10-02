import observable from '../src/observable';

const changes = [];
let obj = {};

describe("Tests of a dynamic proxy:", () => {
    it("watching an object returning a proxy, isProxy = true?", () => {
        obj = observable(obj);
        obj.watch(change => changes.push(change));
        expect(obj.isProxy ? true : false).toBe(true);
    });
    it("create & set property of base type 'number, string, etc.' to 20", () => {
        obj.id = 20;
        expect(changes[0].path).toBe(".id");
        expect(changes[0].value[0].oldValue).toBe(undefined);
        expect(changes[0].value[0].newValue).toBe(20);
    });
    it("create & set property of array type to []", () => {
        obj.items = [];
        expect(changes[1].path).toBe(".items");
        expect(changes[1].value[0].oldValue).toBe(undefined);
        expect(JSON.stringify(changes[1].value[0].newValue)).toBe("[]");
    });
    it("add an array element by push", () => {
        obj.items.push({});
        expect(JSON.stringify(changes[2].value[0])).toBe("{}");

    });
    it("create & set property of newly added array element", () => {
        obj.items[0].name = "Huawei mate 30";
        expect(changes[3].path).toBe(".items.0.name");
        expect(changes[3].value[0].newValue).toBe("Huawei mate 30");
    });
    it("add an element by unshift", () => {
        obj.items.unshift({ name: "IPhone 11" });
        expect(changes[4].path).toBe(".items");
        expect(changes[4].value[0].name).toBe("IPhone 11");
    });
    it("remove an element by pop", () => {
        obj.items.pop();
        expect(changes[5].value[0].name).toBe("IPhone 11");
    });
    it("remove an element by shift", () => {
        obj.items.shift();
        expect(changes[6].value[0].name).toBe("IPhone 11");
    });
    it("set property to same value, should not observe notification", () => {
        obj.id = 20;
        //expect(changes[7].path).toBe(".id");
    });
    it("delete property", () => {
        delete obj.id;
        expect(changes[7].path).toBe(".id");
    });
    it("remove elements by splice", () => {
        obj.items.unshift({});
        obj.items.splice(0, 1);
        expect(changes[9].value.length).toBe(1);
    });
    it("add an array element by push", () => {
        obj.items.push("hello");
        expect(changes[10].value[0]).toBe("hello");
    });
    it("add an array element by push", () => {
        obj.items.unshift("world");
        expect(changes[11].value[0]).toBe("world");
    });
    it("unwatching an object returning the original object, isProxy = false?", () => {
        obj = obj.unwatch();
        expect(obj.isProxy ? true : false).toBe(false);
    });
});