import objectF from '../src/objectFactory';

describe("object creation: ", () => {
    it("quote", () => {
        const quote = objectF.create();
        expect(quote.qnumber).toBe("12345678");
        const item = objectF.create("item");
        quote.items.push(item);
        quote.isValid();
        //expect(quote.isValid()).toBe(false);
    });
    it("address", () => {
        const address = objectF.create("address");
        expect(address.street).toBe("1714");
        address.isValid();
        //expect(address.isValid()).toBe(false);
    });
    it("contact", () => {
        const contact = objectF.create("contact");
        expect(contact.name).toBe("my contact");
        expect(contact.address.street).toBe("1714");
        contact.isValid();
        //expect(contact.isValid()).toBe(false);
    });
    it("account", () => {
        const account = objectF.create("account");
        expect(account.company).toBe("my account");
        expect(account.primaryContact.name).toBe("my contact");
        account.isValid();
        //expect(account.isValid()).toBe(false);
    });
    it("discount", () => {
        const discount = objectF.create("discount");
        expect(discount.method).toBe("amount");
        discount.isValid();
        //expect(discount.isValid()).toBe(false);
        discount.calc(100);
        //expect(discount.calc(100)).toBe(100);
    });
    it("item", () => {
        const item = objectF.create("item");
        expect(item.name).toBe("my item");
        item.discount = objectF.create("discount");
        let child = objectF.create("item");
        item.children.push(child);
        item.isValid();
        //expect(item.isValid()).toBe(false);
        item.calc(100);
        //expect(item.calc()).toBe(0);
    });
});