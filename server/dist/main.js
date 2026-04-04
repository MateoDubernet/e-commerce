"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = require("./database/connection");
const creation_1 = require("./database/creation");
const createtables_1 = require("./database/createtables");
const user_service_1 = require("./services/user.service");
const basket_service_1 = require("./services/basket.service");
const item_service_1 = require("./services/item.service");
const order_service_1 = require("./services/order.service");
const createitems_1 = require("./database/createitems");
const app = (0, express_1.default)();
const port = 8000;
const dataBase = new connection_1.DatabaseConnection("localhost", "root", "root", "e_commerce", 3306);
const create = new creation_1.DataBaseCreation(dataBase);
const dataBaseTableList = new createtables_1.TableCreationList();
const startApp = async () => {
    try {
        await create.dataBase("e_commerce");
        const userService = new user_service_1.UserService(dataBase);
        const basketService = new basket_service_1.BasketService(dataBase);
        const itemService = new item_service_1.ItemService(dataBase);
        const orderService = new order_service_1.OrderService(dataBase);
        app.use(function (request, response, next) {
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        [userService, basketService, itemService, orderService].forEach((service) => (service.app = app));
        const tables = [
            dataBaseTableList.addUserTable(),
            dataBaseTableList.addItemTable(),
            dataBaseTableList.addOrderTable(),
            dataBaseTableList.addBasketTable(),
            dataBaseTableList.addBasketItemsTable(),
            dataBaseTableList.addOrderItemsTable(),
        ];
        for (const table of tables) {
            await create.table(dataBase.databaseName, table);
        }
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
        itemService.saveItems(createitems_1.createItems);
        ;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error("Erreur lors de l'initialisation de la BDD :", err);
        process.exit(1);
    }
};
startApp();
//# sourceMappingURL=main.js.map