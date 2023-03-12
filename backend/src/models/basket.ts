import { Item } from "./item";
import { User } from "./user";

export class Basket {
    id: number;
    user_id: number;
    items: Item[];

    constructor(){}
}