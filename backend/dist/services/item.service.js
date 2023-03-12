"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const express_1 = __importDefault(require("express"));
class ItemService {
    constructor(dataBase) {
        this.app = (0, express_1.default)();
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);
    }
    getItem() {
        this.app.get('/item', (request, response) => {
            return new Promise((result, reject) => {
                this.connection.query(`SELECT * FROM items`, (error, data) => {
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
    getItemById() {
        this.app.get(`/item/:id`, (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM items WHERE id = ${request.params.id}`;
                this.connection.query(queryRequest, (error, data) => {
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
    saveItems(items) {
        let newItems = [];
        this.connection.query(`SELECT * FROM items`, (error, data) => {
            items.forEach(item => {
                const findItem = data === null || data === void 0 ? void 0 : data.find(element => item.name === element.name);
                if (!findItem) {
                    newItems.push(item);
                }
            });
            this.insertItem(newItems);
        });
    }
    insertItem(newItems) {
        if (newItems.length > 0) {
            return new Promise((result, reject) => {
                let queryRequest = 'INSERT INTO items (name, price, category, inventory, description) VALUES';
                for (let i = 0; i < newItems.length; i++) {
                    const item = newItems[i];
                    queryRequest += `("${item.name}", ${item.price}, "${item.category}", ${item.inventory}, "${item.description}")`;
                    if (i !== newItems.length - 1) {
                        queryRequest += ',';
                    }
                }
                this.connection.query(queryRequest, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        result(data);
                    }
                });
            });
        }
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map