"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseEdit = void 0;
class DataBaseEdit {
    constructor(dataBase) {
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
    }
    alterTable(databaseName, tableName, data) {
        this.connection.query(`USE ${databaseName}`);
        return new Promise((result, reject) => {
            let editTable = `ALTER TABLE ${tableName} ${data}`;
            this.connection.query(editTable, (error, data) => {
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
exports.DataBaseEdit = DataBaseEdit;
//# sourceMappingURL=edit.js.map