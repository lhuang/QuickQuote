
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
        isValid() {
            let ans = this.qnumber && this.customer;
            for (let item of this.items) {
                ans = ans && item && item.isValid();
            }

            return ans;
        }
    };
    const _address = {
        street: "1714",
        city: "",
        state: "",
        zip: "",
        country: "",
        isValid() {
            return this.street &&
                this.city &&
                this.state &&
                this.zip;
        }
    };
    const _account = {
        company: "my account",
        address: null,
        primaryContact: null,
        isValid() {
            return this.company &&
                this.address &&
                //this.address.isValid() &&
                this.primaryContact;
            //this.primaryContact.isValid();
        }
    };
    const _contact = {
        name: "my contact",
        email: "",
        phone: "",
        address: null,
        isValid() {
            return this.name &&
                this.email &&
                this.address;// &&
            //this.address.isValid();
        }
    };
    const _item = {
        parent: "",
        name: "my item",
        description: "",
        price: 0.00,
        quantity: 0,
        discount: "",
        children: [],
        isValid() {
            let ans = this.name;
            for (let child of this.children) {
                //ans = ans && child.isValid();
            }

            return ans;
        },
        calc() {
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
            case Type.Address:
                Object.assign(ans, _address);
                break;
            case Type.Account:
                let c = {};
                Object.assign(ans, _account);
                ans.address = _create(Type.address);
                ans.primaryContact = _create(Type.Contact);
                break;
            case Type.Contact:
                Object.assign(ans, _contact);
                ans.address = _create(Type.Address);
                break;
            case Type.Item:
                Object.assign(ans, _item);
                break;
            case Type.Discount:
                Object.assign(ans, _discount);
                break;
            case Type.Quote:
                Object.assign(ans, _quote);
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