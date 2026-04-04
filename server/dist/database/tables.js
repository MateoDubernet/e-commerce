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
            "`price` BIGINT(20) NOT NULL,",
            "`inventory` BIGINT(20) NOT NULL,",
            "`seller` VARCHAR(100) NOT NULL,",
            "`desciption` TEXT NOT NULL,",
            "PRIMARY KEY (`id`) USING BTREE"
        ];
        return new table_1.Table("items", itemTableColumns);
    }
    addBankCardTable() {
        const bankCardTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`user_id` BIGINT(20) NOT NULL,",
            "`user_name` VARCHAR(100) NOT NULL,",
            "`card_number` BIGINT(20) NOT NULL,",
            "`expiry_date` DATE NOT NULL,",
            "`security_code` SMALLINT(6) NOT NULL,",
            "PRIMARY KEY (`id`) USING BTREE,",
            "INDEX `user_id` (`user_id`) USING BTREE,",
            "CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE"
        ];
        return new table_1.Table("bank_card", bankCardTableColumns);
    }
    addAddressTable() {
        const addressTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`user_id` BIGINT(20) NOT NULL,",
            "`town` VARCHAR(100) NOT NULL,",
            "`post_code` SMALLINT(6) NOT NULL,",
            "`road` VARCHAR(150) NOT NULL,",
            "`floor_number` SMALLINT(6) NULL DEFAULT NULL,",
            "PRIMARY KEY (`id`) USING BTREE,",
            "INDEX `address_user_id` (`user_id`) USING BTREE,",
            "CONSTRAINT `address_user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION"
        ];
        return new table_1.Table("address", addressTableColumns);
    }
    addOrderTable() {
        const orderTableColumns = [
            "`id` BIGINT(20) NOT NULL AUTO_INCREMENT,",
            "`user_id` BIGINT(20) NOT NULL,",
            "`address_id` BIGINT(20) NOT NULL,",
            "`item_id` BIGINT(20) NOT NULL,",
            "`order_date` DATETIME NOT NULL DEFAULT current_timestamp(),",
            "`total_cost` BIGINT(20) NOT NULL,",
            "`statut` VARCHAR(50) NOT NULL DEFAULT 'En préparation',",
            "PRIMARY KEY (`id`) USING BTREE,",
            "INDEX `order_user_id` (`user_id`) USING BTREE,",
            "INDEX `order_address_id` (`address_id`) USING BTREE,",
            "INDEX `order_item_id` (`item_id`) USING BTREE,",
            "CONSTRAINT `order_address_id` FOREIGN KEY (`address_id`) REFERENCES `e_commerce`.`address` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,",
            "CONSTRAINT `order_user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,",
            "CONSTRAINT `order_item_id` FOREIGN KEY (`item_id`) REFERENCES `e_commerce`.`items` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION",
        ];
        return new table_1.Table("`order`", orderTableColumns);
    }
    addBasketTable() {
        const basketTableColumns = [
            "`user_id` BIGINT(20) NOT NULL,",
            "`item_id` BIGINT(20) NULL DEFAULT NULL,",
            "INDEX `basket_item_id` (`item_id`) USING BTREE,",
            "INDEX `basket_user_id` (`user_id`) USING BTREE,",
            "CONSTRAINT `basket_item_id` FOREIGN KEY (`item_id`) REFERENCES `e_commerce`.`items` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,",
            "CONSTRAINT `basket_user_id` FOREIGN KEY (`user_id`) REFERENCES `e_commerce`.`user` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION"
        ];
        return new table_1.Table("basket", basketTableColumns);
    }
}
exports.TableCreationList = TableCreationList;
//# sourceMappingURL=tables.js.map