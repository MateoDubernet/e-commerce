import express, { Request, Response } from "express";
import { Connection } from "mysql2";
import { Item } from "../models/item";
import { DatabaseConnection } from "../database/connection";

export class ItemService {

    public app = express();
    private dataBaseConnection: DatabaseConnection;
    private connection: Connection;

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);  
    }

    getItem(){
        this.app.get('/item', (request, response) => {
            return new Promise((result, reject) => {
                this.connection.query(`SELECT * FROM items`, (error: Error, data: Item[]) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        response.json(data);
                        result(data) 
                    } 
                });
            });
        });
    }

    getItemById(){
        this.app.get(`/item/:id`, (request, response) => {
            
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM items WHERE id = ${request.params.id}`
                this.connection.query(queryRequest, (error, data) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        response.json(data);
                        result(data) 
                    } 
                })
            })
        });
    }

    saveItems(items: Item[]){
        let newItems: Item[] = [];
        this.connection.query(`SELECT * FROM items`, (error: Error, data: Item[]) => {
            items.forEach(item => {
                const findItem = data?.find(element => item.name === element.name);
                if (!findItem) {
                    newItems.push(item);
                }
            });
            this.insertItem(newItems)
        });
    }

    insertItem(newItems: Item[]){
        if (newItems.length > 0) {
            return new Promise((result, reject) => {
                let queryRequest = 'INSERT INTO items (name, price, category, inventory, description) VALUES';
                
                for (let i = 0; i < newItems.length; i++) {
                    const item = newItems[i];
                    queryRequest += `("${item.name}", ${item.price}, "${item.category}", ${item.inventory}, "${item.description}")`
                    if (i !== newItems.length -1) {
                        queryRequest += ',';
                    }
                }
                
                this.connection.query(queryRequest, (error, data) => {
                    if (error){ reject(error) } 
                    else { result(data) } 
                });
            });
        }
    }
}