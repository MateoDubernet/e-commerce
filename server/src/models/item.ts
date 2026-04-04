export class Item {

    id: number;
    name: string;
    price: number;
    category: string;
    inventory: number;
    description: string;

    constructor(name: string, price: number, category: string, inventory: number, description: string){

        this.name = name;
        this.price = price;
        this.category = category;
        this.inventory = inventory;
        this.description = description;
    }
}