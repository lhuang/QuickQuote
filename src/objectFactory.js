
function objectFactory() {
    /**
    * 
    */
    const Type = {
        QUOTE: "quote",
        ADDRESS: "address",
        ACCOUNT: "account",
        CONTACT: "contact",
        ITEM: "item",
        DISCOUNT: "discount"
    };
    const _quote = {
        qnumber: "",
        id: 10,
        customer: {},
        items: [],
        isValid() {
            let ans = this.qnumber && this.customer;
            for (let item of this.items) {
                ans = ans && item && item.isValid();
            }

            return ans;
        }
    };
    const _address = {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        isValid() {
            return street &&
                city &&
                state &&
                zip;
        }
    };
    const _account = {
        company: "",
        address: {},
        primaryContact: {},
        isValid() {
            return company &&
                address &&
                address.isValid() &&
                primaryContact &&
                primaryContact.isValid();
        }
    };
    const _contact = {
        name: "",
        email: "",
        phone: "",
        address: {},
        isValid() {
            return name &&
                email &&
                address &&
                address.isValid();
        }
    };
    const _item = {
        container: "",
        name: "",
        description: "",
        price: 0.00,
        quantity: 0,
        discount: "",
        items: [],
        isValid() {
            let ans = name;
            for (let item of items) {
                ans = ans && item && item.isValid();
            }

            return ans;
        },
        calc() {
            let amt = quantity * price;
            if (discount && discount.approved) {
                amt -= discount.calc(amt);
            }
            return amt;
        },
    };

    const _discount = {
        method: "amount",
        value: 0.00,
        approved: true,
        isValid() {
            return this.method === "percent" ||
                this.method === "amount";
        },
        calc(amt) {
            return this.method === "amount" ?
                amt - this.value :
                amt * (1 - this.value);
        },
    };

    const _create = name => {
        let ans = {};
        switch (name) {
            case Type.ADDRESS:
                Object.assign(ans, _address);
                break;
            case Type.ACCOUNT:
                let c = {};
                Object.assign(ans, _account);
                Object.assign(ans.address, _create(Type.ADDRESS));
                Object.assign(ans.primaryContact, _create(Type.CONTACT));
                break;
            case Type.CONTACT:
                Object.assign(ans, _contact);
                Object.assign(ans.address, _create(Type.ADDRESS));
                break;
            case Type.ITEM:
                Object.assign(ans, _item);
                break;
            case Type.DISCOUNT:
                Object.assign(ans, _discount);
                break;
            case Type.QUOTE:
                Object.assign(ans, _quote);
                break;
            default:

                break;
        }

        return ans;
    };
    return {
        create: (name) => {
            return _create(name);
        }
    };
}

module.exports = objectFactory;