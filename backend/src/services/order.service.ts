import express, { Request, Response } from "express";
import { Connection, ResultSetHeader } from "mysql2";
import { Item } from "../models/item";
import { DatabaseConnection } from "../database/connection";
import { Order } from "../models/order";

export class OrderService {

    public app = express();
    private dataBaseConnection: DatabaseConnection;
    private connection: Connection;

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);  
    }

    getOrder(){
        this.app.get('/order', (request, response) => {
            response.json(request.body);
        })
    }

    getOrderByUserId(){
        this.app.get(`/order/:id`, (request, response) => {
            
            return new Promise((result, reject) => {
                let queryRequest = 'SELECT * FROM `order` WHERE user_id =' + `${request.params.id}`
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

    getOrderItemsByOrderId(){
        this.app.get(`/order-items/:id`, (request, response) => {
            
            return new Promise((result, reject) => {
                let queryRequest = 'SELECT items.id, items.name, items.price FROM `order` '
                queryRequest += `INNER JOIN order_items ON order.id = order_items.order_id `
                queryRequest += `INNER JOIN items ON order_items.item_id = items.id `
                queryRequest += `WHERE order_id = ${request.params.id}`
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

    saveOrder(){
        this.app.post('/order', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = 'INSERT INTO `order` (user_id, total_cost) VALUES ' + `('${request.body.user_id}', '${request.body.total_cost}')`
                this.connection.query(queryRequest, (error, data: ResultSetHeader) => {
                    if (error){ 
                        response.json(error);
                        reject(error) 
                    } 
                    else { 
                        request.body.id = data.insertId
                        response.json(request.body);
                        result(data) 
                    } 
                })
            })
        });
    }

    saveOrderItems(){
        this.app.post('/order-items/:orderId', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `INSERT INTO order_items (item_id, order_id) VALUES `

                for (let i = 0; i < request.body.items.length; i++) {
                    const item = request.body.items[i];
                    queryRequest += `('${item.id}', '${request.params.orderId}')`
                    if (i !== request.body.items.length -1) {
                        queryRequest += ',';
                    }
                }

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
            });
        })
    }
}