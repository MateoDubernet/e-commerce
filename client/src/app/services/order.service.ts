import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item";
import { Order } from "../models/order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient){}

    getOrderByUserId(id: number):Observable<Order[]>{
        return this.http.get<Order[]>(`http://localhost:8000/order/${id}`);
    }

    getOrderItemsByOrderId(id: number):Observable<Item[]>{
        return this.http.get<Item[]>(`http://localhost:8000/order-items/${id}`);
    }

    saveOrder(newOrder: Order):Observable<Order>{
        return this.http.post<Order>("http://localhost:8000/order", newOrder);
    }

    saveOrderItems(order: Order):Observable<Order>{
        return this.http.post<Order>(`http://localhost:8000/order-items/${order.id}`, order);
    }
}