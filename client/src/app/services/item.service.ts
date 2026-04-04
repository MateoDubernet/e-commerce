import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient){}

    getItem():Observable<Item[]>{
        return this.http.get<Item[]>("http://localhost:8000/item");
    }

    getItemById(id: number):Observable<Item[]>{
        return this.http.get<Item[]>(`http://localhost:8000/item/${id}`);
    }

    saveItem(newItem: Item):Observable<Item>{
        return this.http.post<Item>("http://localhost:8000/item", newItem);
    }
}