import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Basket } from "../models/basket";
import { Item } from "../models/item";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class BasketService {

    constructor(private http: HttpClient){}

    getBasket():Observable<Basket[]>{
        return this.http.get<Basket[]>("http://localhost:8000/basket");
    }

    getBasketByUserId(userId: number):Observable<Basket[]>{
        return this.http.get<Basket[]>(`http://localhost:8000/basket/${userId}`);
    }

    getBasketItems(basketId: number):Observable<Item[]>{
        return this.http.get<Item[]>(`http://localhost:8000/basket-item/${basketId}`);
    }

    saveBasketItem(id: number, item: Item):Observable<Basket>{
        return this.http.post<Basket>(`http://localhost:8000/basket-item/${id}`, item);
    }

    saveBasket(user: User):Observable<Basket>{
        return this.http.post<Basket>("http://localhost:8000/basket", user);
    }

    deleteBasketItems(basketId: number){
        return this.http.delete(`http://localhost:8000/basket/delete/${basketId}`);
    }
}