"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const express_1 = __importDefault(require("express"));
class AddressService {
    constructor(dataBase) {
        this.app = (0, express_1.default)();
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);
    }
    getAddress() {
        this.app.get('/address', (request, response) => {
            return new Promise((result, reject) => {
                this.connection.query(`SELECT * FROM address`, (error, data) => {
                    if (error) {
                        response.json(error);
                        reject(error);
                    }
                    else {
                        response.json(data);
                        result(data);
                    }
                });
            });
        });
    }
    postAddress() {
        this.app.post('/address', (request, response) => {
            response.json(request.body);
        });
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map