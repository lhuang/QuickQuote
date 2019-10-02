const clone = require('lodash/clonedeep');
const objectF = function () {
    /**
    * 
    */
    const Type = {
        Quote: "quote",
        Address: "address",
        Account: "account",
        Contact: "contact",
        Item: "item",
        Discount: "discount"
    };
    const _quote = {
        qnumber: "12345678",
        id: 10,
        customer: null,
        items: [],
        isValid: function () {
            let ans = this.qnumber && this.customer;
            for (let item of this.items) {
                ans = ans && item.isValid();
            }

            return ans;
        }
    };
    const _address = {
        street: "1714",
        city: null,
        state: null,
        zip: null,
        country: null,
        isValid: function () {
            return Boolean(this.street && this.city && this.state && this.zip);
        }
    };
    const _account = {
        company: "my account",
        address: null,
        primaryContact: null,
        isValid: function () {
            return this.company && this.address && this.primaryContact.isValid();
        }
    };
    const _contact = {
        name: "my contact",
        email: null,
        phone: null,
        address: null,
        isValid: function () {
            return this.name && this.email && this.address.isValid();
        }
    };
    const _item = {
        parent: "",
        name: "my item",
        description: "",
        price: 0.00,
        quantity: 1,
        discount: "",
        children: [],
        isValid: function () {
            let ans = this.name;
            for (let child of this.children) {
                child.isValid();
            }

            return false;
        },
        calc: function () {
            let amt = this.quantity * this.price;
            if (this.discount && this.discount.approved) {
                amt -= this.discount.calc(amt);
            }
            return amt;
        },
    };
    const _discount = {
        method: "amount",
        value: 0.00,
        approved: true,
        isValid: function () {
            return this.method === "percent" ||
                this.method === "amount";
        },
        calc: function (amt) {
            return this.method === "amount" ? amt - this.value : amt * (1 - this.value);
        },
    };

    const _create = name => {
        let ans = {};
        switch (name) {
            case Type.Address:
                ans = clone(_address);
                break;
            case Type.Account:
                ans = clone(_account);
                ans.address = _create(Type.address);
                ans.primaryContact = _create(Type.Contact);
                break;
            case Type.Contact:
                ans = clone(_contact);
                ans.address = _create(Type.Address);
                break;
            case Type.Item:
                ans = clone(_item);
                break;
            case Type.Discount:
                ans = clone(_discount);
                break;
            case Type.Quote:
                ans = clone(_quote);
                break;
            default:

                break;
        }

        return ans;
    };
    return {
        create: (name = null) => {
            return _create(name || "quote");
        }
    };
}();

module.exports = objectF;