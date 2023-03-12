import express, { Request, Response } from "express";
import { Connection, ResultSetHeader } from "mysql2";
import { DatabaseConnection } from "../database/connection";

export class UserService {

    public app = express();
    private dataBaseConnection: DatabaseConnection;
    private connection: Connection;

    constructor(dataBase: DatabaseConnection){
        this.dataBaseConnection = dataBase;
        this.connection = this.dataBaseConnection.connection();
        this.connection.query(`USE ${this.dataBaseConnection.databaseName}`);  
    }

    getUser(){
        this.app.get('/users', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM user`
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

    getUserById(){
        this.app.get(`/users/:id`, (request, response) => {
            
            return new Promise((result, reject) => {
                let queryRequest = `SELECT * FROM user WHERE id = ${request.params.id}`
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

    saveUser(){      
        this.app.post('/users', (request, response) => {
            return new Promise((result, reject) => {
                let queryRequest = `INSERT INTO user (nom, prenom, email, password) VALUES ('${request.body.nom}', '${request.body.prenom}', '${request.body.email}', '${request.body.password}')`
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
        })
    }
}