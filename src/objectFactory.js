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
        qnumber: null,
        timestamp: null,
        customer: null,
        items: [],
        isValid: function () {
            let ans = (this.qnumber ? true : false);
            ans = ans && (this.customer ? true : false);
            ans = ans && this.customer.isValid();
            //
            for (let item of this.items) {
                ans = ans && item.isValid();
            }

            return ans;
        },
        calc: function () {
            let amt = 0;
            for (let child of this.items) {
                amt += child.calc();
            }
            return amt;
        }
    };
    const _address = {
        street: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        isValid: function () {
            let ans = this.street ? true : false;
            ans = ans && (this.city ? true : false);
            ans = ans && (this.state ? true : false);
            ans = ans && (this.zip ? true : false);
            return ans;
        }
    };
    const _account = {
        company: null,
        address: null,
        primaryContact: null,
        isValid: function () {
            let ans = this.company ? true : false;
            ans = ans && (this.address ? true : false);
            ans = ans && this.address.isValid();
            ans = ans && (this.primaryContact ? true : false);
            ans = ans && this.primaryContact.isValid();
            return ans;
        }
    };
    const _contact = {
        name: null,
        email: null,
        phone: null,
        address: null,
        isValid: function () {
            return (this.name ? true : false) &&
                (this.email ? true : false) &&
                (this.address ? true : false) &&
                this.address.isValid();
        }
    };
    const _item = {
        parent: null,
        name: null,
        description: null,
        price: 0.00,
        quantity: 0,
        discount: null,
        children: [],
        isValid: function () {
            let ans = (this.name ? true : false);
            ans = ans && this.price >= 0;
            ans = ans && (typeof (this.price) === "number");
            ans = ans && (this.quantity >= 0);
            ans = ans && (typeof (this.quantity) === "number");

            for (let child of this.children) {
                ans = ans && child.isValid();
            }
            return ans;
        },
        calc: function () {
            let amt = this.quantity * this.price;

            for (let child of this.children) {
                amt += child.calc();
            }

            if (this.discount && this.discount.approved) {
                amt = this.discount.calc(amt);
            }

            return amt;
        },
    };
    const _discount = {
        name: null,
        group: null,
        method: "amount",
        value: 0.00,
        approved: true,
        isValid: function () {
            let ans1 = this.method === "amount";
            ans1 = ans1 && this.value >= 0;
            let ans2 = this.method === "percent";
            ans2 = ans2 && this.value < 1;
            let ans = ans1 || ans2;
            ans = ans && (typeof (this.value) === "number");
            ans = ans && (typeof (this.approved) === "boolean");
            return ans;
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
                ans.address = _create(Type.Address);
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
                ans = { isEmpty: true };
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