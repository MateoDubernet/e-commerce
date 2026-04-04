import { Item } from "./item";
import { User } from "./user";

export class Order {

    id: number;
    user_id: number;
    items: Item[];
    order_date: Date;
    total_cost: number;
    statut: string;

    constructor(userId: number, items: Item[], totalCost: number, orderDate?: Date, statut?: string){
        this.user_id = userId
        this.items = items
        this.total_cost = totalCost
        this.order_date = orderDate
        this.statut = statut
    }
}