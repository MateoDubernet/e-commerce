"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseCreation = void 0;
class DataBaseCreation {
    constructor(dataBase) {
        this.dataBaseConnection = dataBase;
    }
    dataBase(name) {
        this.connection = this.dataBaseConnection.connection();
        return new Promise((result, reject) => {
            this.connection.query(`CREATE DATABASE IF NOT EXISTS ${name}`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    result(data);
                }
            });
        });
    }
    table(databaseName, table) {
        this.connection.query(`USE ${databaseName}`);
        return new Promise((result, reject) => {
            let createTable = `CREATE TABLE IF NOT EXISTS ${table.name} `;
            let createColumn = `(`;
            table.columns.forEach(column => {
                createColumn += column;
            });
            createTable += `${createColumn})`;
            this.connection.query(createTable, (error, data) => {
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
exports.DataBaseCreation = DataBaseCreation;
//# sourceMappingURL=creation.js.map