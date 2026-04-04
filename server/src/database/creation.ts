import Connection from "mysql2/typings/mysql/lib/Connection";
import { Table } from "../models/table";
import { DatabaseConnection } from "./connection";

export class DataBaseCreation {

    private dataBaseConnection: DatabaseConnection;
    private connection: Connection

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
    }

    dataBase(name: string){
        this.connection = this.dataBaseConnection.connection();

        return new Promise((result, reject) => {
            this.connection.query(`CREATE DATABASE IF NOT EXISTS ${name}`, (error, data) => {
                if (error){ reject(error) } 
                else { result(data) } 
            })
        })
    }

    table(databaseName: string, table: Table){
        this.connection.query(`USE ${databaseName}`)

        return new Promise((result, reject) => {
            let createTable = `CREATE TABLE IF NOT EXISTS ${table.name} `
            let createColumn = `(`
            table.columns.forEach(column => {
                createColumn += column
            });

            createTable += `${createColumn})`

            this.connection.query(createTable, (error, data) => {
                if (error){ reject(error) } 
                else { result(data) } 
            })
        })
    }
}