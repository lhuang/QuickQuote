export default class Observe {
    static get CREATE() {
        return 'create';
    }
    static get UPDATE() {
        return 'update';
    }
    static get DELETE() {
        return 'delete';
    }

    static watch(obj, callback, path) {
        let type = Array.isArray(obj) ? "array" : typeof (obj);
        let handler = {
            set: (target, prop, value) => {
                if (target[prop] == null) {
                    let message = {
                        action: Observe.CREATE,
                        path,
                        prop,
                        value,
                        type
                    };
                    callback(message);
                } else {
                    if (target[prop] != value) {
                        let message = {
                            action: Observe.UPDATE,
                            path,
                            prop,
                            newValue: value,
                            oldValue: target[prop],
                            type
                        };
                        callback(message);
                    }
                }
                target[prop] = value;
                return true;
            },
            deleteProperty: (target, prop) => {
                if (prop in target) {
                    delete target[prop];
                    let message = {
                        action: Observe.DELETE,
                        path,
                        prop,
                        type
                    };
                    callback(message);
                    return true;
                } else {
                    return false;
                }
            }
        };
        for (let prop in obj) {
            if (obj[prop] instanceof Object) {
                obj[prop] = Observe.watch(obj[prop], callback, `${( path != null ) ? path + '.' : '' }${prop}`);
            }
        }
        return new Proxy(obj, handler);
    }

    static unwatch(obj) {
        let o = {};
        for (let key in obj) {
            if (typeof obj[key] !== "object") {
                o[key] = obj[key];
            } else {
                o[key] = Observe.unwatch(obj[key]);
            }
        }
        return o;
    }
}