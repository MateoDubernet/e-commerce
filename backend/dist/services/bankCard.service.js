"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCardService = void 0;
const express_1 = __importDefault(require("express"));
class BankCardService {
    constructor(dataBase) {
        this.app = (0, express_1.default)();
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);
    }
    getBankCard() {
        this.app.get('/bank-card', (request, response) => {
            return new Promise((result, reject) => {
                this.connection.query(`SELECT * FROM bank_card`, (error, data) => {
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
    postBankCard() {
        this.app.post('/bank-card', (request, response) => {
            response.json(request.body);
        });
    }
}
exports.BankCardService = BankCardService;
//# sourceMappingURL=bankCard.service.js.map