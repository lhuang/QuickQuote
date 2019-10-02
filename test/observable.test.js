import observable from '../src/observable';

const changes = [];
let obj = {};

describe("property", () => {
    it("watch", () => {
        obj = observable(obj);
        obj.watch(change => changes.push(change));
        expect(obj.isProxy ? true : false).toBe(true);
    });
    it("set id property to 20", () => {
        obj.id = 20;
        expect(changes[0].path).toBe(".id");
        expect(changes[0].value[0].oldValue).toBe(undefined);
        expect(changes[0].value[0].newValue).toBe(20);
    });
    it("create array", () => {
        obj.items = [];
        expect(changes[1].path).toBe(".items");
        expect(changes[1].value[0].oldValue).toBe(undefined);
        expect(JSON.stringify(changes[1].value[0].newValue)).toBe("[]");
    });
    it("add array element", () => {
        obj.items.push({});
        expect(changes[2].path).toBe(".items");
        //expect(JSON.stringify(changes[2].value[0].newValue)).toBe("{}");
    });
    it("addp roperty of newly created object", () => {
        obj.items[0].name = "Huawei mate 30";
        expect(changes[3].path).toBe(".items.0.name");
        expect(changes[3].value[0].newValue).toBe("Huawei mate 30");
    });
    it("unshift", () => {
        obj.items.unshift({ name: "IPhone 11" });
        expect(changes[4].path).toBe(".items");
        expect(changes[4].value[0].name).toBe("IPhone 11");
    });
    it("pop", () => {
        obj.items.pop();
        expect(changes[5].value[0].name).toBe("IPhone 11");
    });
    it("shift", () => {
        obj.items.shift();
        expect(changes[6].value[0].name).toBe("IPhone 11");
    });
    it("no change", () => {
        obj.id = 20;
        //expect(changes[7].path).toBe(".id");
    });
    it("delete property", () => {
        delete obj.id;
        expect(changes[7].path).toBe(".id");
    });
    it("splice", () => {
        obj.items.unshift({});
        obj.items.splice(0, 1);
        expect(changes[9].value.length).toBe(1);
    });
    it("isProxy", () => {
        expect(obj.isProxy).toBe(true);
    });
    it("unwatch", () => {
        let x = obj.unwatch();
        expect(x.isProxy ? true : false).toBe(false);
    });
});