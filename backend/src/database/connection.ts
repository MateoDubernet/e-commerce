import mysql from 'mysql2'

export class DatabaseConnection {

    private host: string;
    private user: string;
    private password: string;
    private _databaseName: string;
    private port: number;

    constructor(host: string, user: string, password: string, databaseName: string, port: number){
        this.host = host;
        this.user = user;
        this.password = password;
        this.databaseName = databaseName;
        this.port = port;
    }

    public get databaseName(): string {
        return this._databaseName;
    }
    public set databaseName(value: string) {
        this._databaseName = value;

    }

    connection(){
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            port: this.port
        })
    }
}