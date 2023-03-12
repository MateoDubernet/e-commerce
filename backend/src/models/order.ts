import { Item } from "./item";
import { User } from "./user";

export class Order {

    id: number;
    user: User;
    items: Item[];
    orderDate: Date;
    totalCost: number;
    statut: string;

    constructor(){}
}