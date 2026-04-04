"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class DatabaseConnection {
    constructor(host, user, password, databaseName, port) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.databaseName = databaseName;
        this.port = port;
    }
    get databaseName() {
        return this._databaseName;
    }
    set databaseName(value) {
        this._databaseName = value;
    }
    connection() {
        return mysql2_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            port: this.port
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=connection.js.map