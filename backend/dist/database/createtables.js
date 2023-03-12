"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCreationList = void 0;
const table_1 = require("../models/table");
class TableCreationList {
    constructor() { }
    addUserTable() {
        const userTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`nom` VARCHAR(100) NOT NULL,",
            "`prenom` VARCHAR(100) NOT NULL,",
            "`email` VARCHAR(100) NOT NULL,",
            "`password` VARCHAR(100) NOT NULL,",
            "PRIMARY KEY (`id`) USING BTREE"
        ];
        return new table_1.Table("user", userTableColumns);
    }
    addItemTable() {
        const itemTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`name` VARCHAR(150) NOT NULL,",
            "`price` FLOAT NOT NULL,",
            "`category` VARCHAR(100) NOT NULL,",
            "`inventory` BIGINT(20) NOT NULL,",
            "`description` TEXT NOT NULL,",
            "PRIMARY KEY (`id`) USING BTREE"
        ];
        return new table_1.Table("items", itemTableColumns);
    }
    addOrderTable() {
        const orderTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`user_id` BIGINT(20) NOT NULL,",
            "`order_date` DATETIME NOT NULL DEFAULT current_timestamp(),",
            "`total_cost` FLOAT NOT NULL,",
            "`statut` VARCHAR(50) NOT NULL DEFAULT 'En préparation',",
            "PRIMARY KEY (`id`) USING BTREE,",
            "INDEX `order_user_id` (`user_id`) USING BTREE,",
            "CONSTRAINT `order_user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION",
        ];
        return new table_1.Table("`order`", orderTableColumns);
    }
    addBasketTable() {
        const basketTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`user_id` BIGINT(20) NOT NULL,",
            "PRIMARY KEY (`id`) USING BTREE,",
            "INDEX `basket_user_id` (`user_id`) USING BTREE,",
            "CONSTRAINT `basket_user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION"
        ];
        return new table_1.Table("basket", basketTableColumns);
    }
    addBasketItemsTable() {
        const basketItemsTableColumns = [
            "`item_id` BIGINT(20) NOT NULL,",
            "`basket_id` BIGINT(20) NOT NULL,",
            "INDEX `basket_items_item_id` (`item_id`) USING BTREE,",
            "INDEX `basket_items_basket_id` (`basket_id`) USING BTREE,",
            "CONSTRAINT `basket_items_basket_id` FOREIGN KEY (`basket_id`) REFERENCES `e_commerce`.`basket` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,",
            "CONSTRAINT `basket_items_item_id` FOREIGN KEY (`item_id`) REFERENCES `e_commerce`.`items` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION"
        ];
        return new table_1.Table("basket_items", basketItemsTableColumns);
    }
    addOrderItemsTable() {
        const orderItemsTableColumns = [
            "`item_id` BIGINT(20) NOT NULL,",
            "`order_id` BIGINT(20) NOT NULL,",
            "INDEX `order_items_item_id` (`item_id`) USING BTREE,",
            "INDEX `order_items_order_id` (`order_id`) USING BTREE,",
            "CONSTRAINT `order_items_order_id` FOREIGN KEY (`order_id`) REFERENCES `e_commerce`.`order` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,",
            "CONSTRAINT `order_items_item_id` FOREIGN KEY (`item_id`) REFERENCES `e_commerce`.`items` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION"
        ];
        return new table_1.Table("order_items", orderItemsTableColumns);
    }
}
exports.TableCreationList = TableCreationList;
//# sourceMappingURL=createtables.js.map