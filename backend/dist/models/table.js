"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(name, columns) {
        this._name = name;
        this._columns = columns;
    }
    get name() {
        return this._name;
    }
    get columns() {
        return this._columns;
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map