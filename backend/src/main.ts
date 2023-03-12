import express, { Request, Response } from "express";
import { DatabaseConnection } from "./database/connection";
import { DataBaseCreation } from "./database/creation";
import { TableCreationList } from "./database/createtables"
import { UserService } from "./services/user.service";
import bodyParser from 'body-parser';
import { BasketService } from "./services/basket.service";
import { ItemService } from "./services/item.service";
import { OrderService } from "./services/order.service";
import { createItems } from "./database/createitems";

const app = express();
const port = 8000;

const dataBase = new DatabaseConnection("localhost", "root", "root", "e_commerce", 3306);
const create = new DataBaseCreation(dataBase);
const dataBaseTableList = new TableCreationList();

create.dataBase("e_commerce");
const userService = new UserService(dataBase);
const basketService = new BasketService(dataBase);
const itemService = new ItemService(dataBase);
const orderService = new OrderService(dataBase);

app.use(function (request, response, next){
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

userService.app = app;
basketService.app = app;
itemService.app = app;
orderService.app = app;


create.table(dataBase.databaseName, dataBaseTableList.addUserTable());
create.table(dataBase.databaseName, dataBaseTableList.addItemTable());
create.table(dataBase.databaseName, dataBaseTableList.addOrderTable());
create.table(dataBase.databaseName, dataBaseTableList.addBasketTable());
create.table(dataBase.databaseName, dataBaseTableList.addBasketItemsTable());
create.table(dataBase.databaseName, dataBaseTableList.addOrderItemsTable());

userService.getUser();
userService.getUserById();
userService.saveUser();

orderService.getOrder();
orderService.getOrderItemsByOrderId();
orderService.getOrderByUserId();

orderService.saveOrder();
orderService.saveOrderItems();

basketService.getBasket();
basketService.getBasketByUserId();
basketService.getBasketItems();
basketService.deleteBasketItems();

basketService.saveBasketItem();
basketService.saveBasket();

itemService.getItem();
itemService.getItemById();

setTimeout(() => {
  itemService.saveItems(createItems);;
}, 1000);

app.listen(port);