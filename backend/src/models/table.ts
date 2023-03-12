export class Table {

    private _name: string;
    private _columns: string[];

    constructor(name: string, columns: string[]){
        this._name = name;
        this._columns = columns;
    }

    get name(){
        return this._name;
    }

    get columns(){
        return this._columns;
    }
}