class Account {
    constructor() {
        this.name = null;
        this.email = null;
        this.phone = null;
        this.address = null;
    }
}

class Contact {
    constructor() {
        this.name = null;
        this.email = null;
        this.phone = null;
        this.address = null;
    }
}

class Item {
    constructor() {
        this.name = null;
        this.unitPrice = 0.00;
        this.quantity = 0;
        this.discount = null;
    }
    calc() {
        let amt = this.quantity * this.unitPrice;
        if (this.discount) {
            amt = discount.calc(amt);
        }

        return amt;
    }
}
class Discount {
    constructor() {
        this.method = "amount";
        this.value = 0.00;
    }
    calc(amt) {
        return this.method === "amount" ?
            amt - this.value :
            amt * (1 - this.value);
    }
}
class Package {
    constructor() {
        this.item = null;
        this.parent = null;
        this.children = [];
        this.name = null;
    }
    path() {
        let p = this.name;
        if (parent)
            p = this.parent.path() + "." + p;

        return p;
    }
    onItemChanged() {
        let amt = 0;
        if (parent) {

        }
    }
    calc(dn = false) {
        if (this.item === null) return 0;

        let amt = this.item.calc();
        if (dn) {
            for (let child in this.children) {
                amt += child.calc();
            }
        }
        return amt;
    }
}
module.exports = {
    Account,
    Contact,
    Item,
    Discount,
    Package
};