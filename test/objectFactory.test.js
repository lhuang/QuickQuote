import objectF from '../src/objectFactory';

const _address = () => {
    const address = objectF.create("address");
    address.street = "1714";
    address.city = "phildalephia";
    address.state = "PA";
    address.zip = "19403";
    return address;
};

const _contact = () => {
    const contact = objectF.create("contact");
    contact.name = "lu huang";
    contact.email = "lh8028@gmail.com";
    contact.address = _address();
    return contact;
};

const _account = () => {
    const account = objectF.create("account");
    account.company = "Essence Solution";
    account.address = _address();
    account.primaryContact = _contact();
    return account;
};

const _item = () => {
    const item = objectF.create("item");
    item.name = "Huawei mate 30";
    item.discount = objectF.create("discount");
    let child = objectF.create("item");
    child.name = "Huawei mate 10";
    item.children.push(child);
    return item;
};

const _discount = () => {
    const discount = objectF.create("discount");
    return discount;
};

const _quote = () => {
    const quote = objectF.create();
    quote.qnumber = "12345678";
    quote.customer = _account();
    const item = _item();
    quote.items.push(item);
    return quote;
};

describe("creaction", () => {
    it("default path", () => {
        const quote = objectF.create("xyz");
        expect(quote.isEmpty).toBe(true);
    });
});

describe("quote", () => {
    it("valid", () => {
        const quote = _quote();

        expect(quote.isValid()).toBe(true);
    });
    it("invalid due to qnumber = null", () => {
        const quote = _quote();
        quote.qnumber = null;
        expect(quote.isValid()).toBe(false);
    });
    it("invalid due to customer = null", () => {
        const quote = _quote();
        quote.customer = null;
        expect(quote.isValid()).toBe(false);
    });
    it("invalid due to invalid child item", () => {
        const quote = _quote();

        quote.items[0].name = null;

        expect(quote.isValid()).toBe(false);
    });
    it("compute total", () => {
        const quote = _quote();
        quote.items[0].price = 100.00;
        quote.items[0].quantity = 1;
        expect(quote.calc()).toBe(100);
    });
});

describe("discount", () => {
    it("valid", () => {
        const discount = _discount();
        expect(discount.isValid()).toBe(true);
    });
    it("invalid due to method = null", () => {
        const discount = _discount();
        discount.method = null;
        expect(discount.isValid()).toBe(false);
    });
    it("invalid due to discount > 100%", () => {
        const discount = _discount();
        discount.method = "percent";
        discount.value = 100;
        expect(discount.isValid()).toBe(false);
    });
    it("invalid due to negative value", () => {
        const discount = _discount();
        discount.value = -10;
        expect(discount.isValid()).toBe(false);
    });
    it("compute discount", () => {
        const discount = _discount();
        expect(discount.calc(100)).toBe(100);
        discount.method = "percent";
        discount.value = 0.5;
        expect(discount.calc(100)).toBe(50);
    });
});

describe("item", () => {
    it("valid with children", () => {
        const item = _item();
        expect(item.isValid()).toBe(true);
    });
    it("invalid due to name = null", () => {
        const item = _item();
        item.name = null;
        expect(item.isValid()).toBe(false);
    });
    it("compute total", () => {
        const item = _item();
        item.price = 100.00;
        item.quantity = 1;
        expect(item.calc()).toBe(100);
    });
});

describe("address", () => {
    it("valid", () => {
        expect(_address().isValid()).toBe(true);
    });
    it("invalid due to street = null", () => {
        const address = _address();
        address.street = null;
        expect(address.isValid()).toBe(false);
    });
    it("invalid due to city = null", () => {
        const address = _address();
        address.city = null;
        expect(address.isValid()).toBe(false);
    });
    it("invalid due to state = null", () => {
        const address = _address();
        address.state = null;
        expect(address.isValid()).toBe(false);
    });
    it("invalid due to zip = null", () => {
        const address = _address();
        address.zip = null;
        expect(address.isValid()).toBe(false);
    });
});

describe("contact", () => {
    it("valid", () => {
        const contact = objectF.create("contact");
        expect(_contact().isValid()).toBe(true);
    });
    it("invalid due to address = null", () => {
        const contact = _contact();
        contact.address = null;
        expect(contact.isValid()).toBe(false);
    });
    it("invalid due to name = null", () => {
        const contact = _contact();
        contact.name = null;
        expect(contact.isValid()).toBe(false);
    });
    it("invalid due to email = null", () => {
        const contact = _contact();
        contact.email = null;
        expect(contact.isValid()).toBe(false);
    });
});

describe("account", () => {
    it("valid", () => {
        const account = _account();

        expect(account.isValid()).toBe(true);
    });
    it("invalid due to address = null", () => {
        const account = _account();

        account.address = null;

        expect(account.isValid()).toBe(false);
    });
    it("invalid due to primaryContact = null", () => {
        const account = _account();
        account.primaryContact = null;

        expect(account.isValid()).toBe(false);
    });
    it("invalid due to company = null", () => {
        const account = _account();

        account.company = null;

        expect(account.isValid()).toBe(false);
    });
});