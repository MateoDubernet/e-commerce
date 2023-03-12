import Connection from "mysql2/typings/mysql/lib/Connection";
import { DatabaseConnection } from "./connection";

export class DataBaseEdit {

    private dataBaseConnection: DatabaseConnection;
    private connection: Connection

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
    }

    alterTable(databaseName: string, tableName: string, data: string){
        
        this.connection.query(`USE ${databaseName}`)

        return new Promise((result, reject) => {
            let editTable = `ALTER TABLE ${tableName} ${data}`

            this.connection.query(editTable, (error, data) => {
                if (error){ reject(error) } 
                else { result(data) } 
            })
        })
    }
}