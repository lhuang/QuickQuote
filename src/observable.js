'use restrict';
function observable(target) {
    let listeners = Symbol('listeners');
    target[listeners] = [];
    target.watch = function (listener) {
        this[listeners].push(listener);
    };
    target.unwatch = function () {
        return _unwatch(target);
    };
    const notify = function (msg) {
        target[listeners].forEach(listener => listener(msg));
    };

    /**
     * 
     */
    const Action = {
        Remove: "remove",
        Add: "add",
        Edit: "edit"
    };

    const _path = (p) => { return p !== null ? p : ""; };

    /**
     * 
     * @param {*} target 
     * @param {*} callback
     * @param {*} path 
     */
    const _proxies = (obj, path) => {
        return {
            push: function () {
                let last = obj.length;
                Array.prototype.push.apply(obj, arguments);
                let message = {
                    action: Action.Add,
                    path,
                    value: [...arguments]
                };
                notify(message);
                for (let arg of [...arguments]) {
                    if (arg instanceof Object) {
                        obj[last] = _watch(arg, `${_path(path)}.${last}`);
                        last++;
                    }
                }
            },
            pop: function () {
                var removed = [obj[obj.length - 1]];
                Array.prototype.pop.apply(obj);
                let message = {
                    action: Action.Remove,
                    path,
                    value: removed
                };
                notify(message);
            },
            shift: function () {
                var removed = [obj[0]];
                Array.prototype.shift.apply(obj);
                let message = {
                    action: Action.Remove,
                    path,
                    value: removed
                };
                notify(message);
            },
            unshift: function () {
                let last = obj.length;
                Array.prototype.unshift.apply(obj, arguments);
                let message = {
                    action: Action.Add,
                    path,
                    value: [...arguments]
                };
                notify(message);
                for (let arg of [...arguments]) {
                    if (arg instanceof Object) {
                        obj[last] = _watch(arg, `${_path(path)}.${last}`);
                        last++;
                    }
                }
            },
            splice: function (index, removeCount) {
                var removed = obj.slice(index, index + removeCount);
                Array.prototype.splice.apply(obj, arguments);
                let message = {
                    action: Action.Remove,
                    path,
                    value: removed
                };
                notify(message);
            }
        };
    };

    /**
     * 
     * @param {*} obj 
     * @param {*} callback
     * @param {*} path 
     */
    const _watch = (obj, path) => {
        let handler = {
            get: (target, prop) => {
                if (prop === "isProxy")
                    return true;

                if (Array.isArray(target)) {
                    let proxies = _proxies(target, _path(path));
                    if (prop in proxies) {
                        return proxies[prop];
                    }
                }

                return target[prop];
            },
            set: (target, prop, value) => {
                let oldValue = target[prop], newValue = value;
                target[prop] = value;
                let message = null;

                if (oldValue !== newValue) {
                    message = {
                        action: Action.Edit,
                        path: `${_path(path)}.${prop}`,
                        value: [{ oldValue, newValue }]
                    };
                    notify(message);
                }

                if (value instanceof Object) {
                    value = _watch(value, `${_path(path)}.${prop}`);
                }

                target[prop] = value;
                return true;
            },
            deleteProperty: (target, prop) => {
                delete target[prop];

                let message = {
                    event: Action.Remove,
                    path: `${_path(path)}.${prop}`,
                    value: null
                };
                // call all handlers
                notify(message);
                return true;
            }
        };
        for (let prop in obj) {
            if (obj[prop] instanceof Object) {
                obj[prop] = _watch(obj[prop], `${_path(path)}.${prop}`);
            }
        }
        return new Proxy(obj, handler);
    };
    const _unwatch = (obj) => {
        let o = {};
        for (let key in obj) {
            if (typeof obj[key] !== "object") {
                o[key] = obj[key];
            } else {
                o[key] = _unwatch(obj[key]);
            }
        }
        return o;
    };

    return _watch(target, null);
}

module.exports = observable;