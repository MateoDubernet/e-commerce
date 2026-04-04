import express, { Request, Response } from "express";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";
import { Basket } from "../models/basket";
import { DatabaseConnection } from "../database/connection";
import { Item } from "../models/item";

export class BasketService {

    public app = express();
    private dataBaseConnection: DatabaseConnection;
    private connection: Connection;

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);  
    }

    getBasket(){
        this.app.get('/basket', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM basket`
                this.connection.query(queryRequest, (error: Error, datas: Basket[]) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        response.json(datas);
                        result(datas) 
                    } 
                });
            });
        });
    }

    getBasketItems(){
        this.app.get('/basket-item/:basketId', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT items.id, items.name, items.price, items.category, items.inventory, items.description FROM basket `
                queryRequest += `INNER JOIN basket_items ON basket.id = basket_items.basket_id `
                queryRequest += `INNER JOIN items ON basket_items.item_id = items.id `
                queryRequest += `WHERE basket.id = ${request.params.basketId}`
                this.connection.query(queryRequest, (error: Error, datas: Item[]) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        response.json(datas);
                        console.log(datas);
                        
                        result(datas) 
                    } 
                });
            });
        });
    }

    getBasketByUserId(){
        this.app.get('/basket/:userId', (request, response) => {
            return new Promise((result, reject) => {
                this.connection.query(`SELECT * FROM basket WHERE user_id = ${request.params.userId}`, (error: Error, data: Basket[]) => {
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

    saveBasketItem(){
        this.app.post('/basket-item/:basketId', (request, response) => {

            return new Promise((result, reject) => {
                this.connection.query(`INSERT INTO basket_items (item_id, basket_id) VALUES (${request.body.id}, ${request.params.basketId})`, (error: Error, data: Basket[]) => {
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

    saveBasket(){
        this.app.post('/basket', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `INSERT INTO basket (user_id) VALUES ('${request.body.id}')`
                this.connection.query(queryRequest, (error, data) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        response.json(request.body);
                        result(data) 
                    } 
                })
            })
        })
    }

    deleteBasketItems(){
        this.app.delete('/basket/delete/:id', (request) => {
            return new Promise((result, reject) => {
                let queryRequest = `DELETE FROM basket_items WHERE basket_id = ('${request.params.id}')`
                this.connection.query(queryRequest, (error, data) => {
                    if (error){ 
                        reject(error) 
                    } 
                    else { 
                        result(data) 
                    } 
                })
            })
        })
    }
}