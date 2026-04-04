"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const express_1 = __importDefault(require("express"));
class UserService {
    constructor(dataBase) {
        this.app = (0, express_1.default)();
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);
    }
    getUser() {
        this.app.get('/users', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM user`;
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
    getUserById() {
        this.app.get(`/users/:id`, (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM user WHERE id = ${request.params.id}`;
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
    saveUser() {
        this.app.post('/users', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `INSERT INTO user (nom, prenom, email, password) VALUES ('${request.body.nom}', '${request.body.prenom}', '${request.body.email}', '${request.body.password}')`;
                this.connection.query(queryRequest, (error, data) => {
                    if (error) {
                        response.json(error);
                        reject(error);
                    }
                    else {
                        request.body.id = data.insertId;
                        response.json(request.body);
                        result(data);
                    }
                });
            });
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map