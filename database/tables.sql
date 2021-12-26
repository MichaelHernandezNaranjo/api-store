
CREATE TABLE `user`(
    `userId` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(120) NOT NULL,
    `userName` VARCHAR(120) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    CONSTRAINT `pk_user` PRIMARY KEY (`userId`),
    CONSTRAINT `un_user` UNIQUE (`email`)
);

CREATE TABLE `category`(
    `categoryId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_category` PRIMARY KEY (`categoryId`)
);

CREATE TABLE `tax`(
    `taxId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_tax` PRIMARY KEY (`taxId`)
);

CREATE TABLE `item`(
    `itemId` VARCHAR(40) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `reference` VARCHAR(20) NULL,
    `isCombo` VARCHAR(1) NOT NULL,
    `isInventoried` VARCHAR(1) NOT NULL,
    `categoryId` INT NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_item` PRIMARY KEY (`itemId`),
    CONSTRAINT `fk_item_category` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`)
);

CREATE TABLE `combo`(
    `parent` VARCHAR(40) NOT NULL,
    `child` VARCHAR(40) NOT NULL,
    CONSTRAINT `pk_combo` PRIMARY KEY (`parent`,`child`),
    CONSTRAINT `fk_combo_parent` FOREIGN KEY (`parent`) REFERENCES `item` (`itemId`),
    CONSTRAINT `fk_combo_child` FOREIGN KEY (`child`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `itemGroup`(
    `itemGroupId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_itemGroup` PRIMARY KEY (`itemGroupId`)
);

CREATE TABLE `itemGroupDetail`(
    `itemGroupId` INT NOT NULL,
    `itemId` VARCHAR(40) NOT NULL
    CONSTRAINT `pk_itemGroupDetail` PRIMARY KEY (`itemGroupId`,`itemId`),
    CONSTRAINT `fk_itemGroupDetail_itemGroup` FOREIGN KEY (`itemGroupId`) REFERENCES `itemGroup` (`itemGroupId`),
    CONSTRAINT `fk_itemGroupDetail_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `warehouse`(
    `warehouseId` VARCHAR(40) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_warehouse` PRIMARY KEY (`warehouseId`)
);

CREATE TABLE `warehouseItem`(
    `warehouseId` VARCHAR(40) NOT NULL,
    `itemId` VARCHAR(40) NOT NULL,
    `stock` INT NOT NULL,
    `committed` INT NOT NULL,
    CONSTRAINT `pk_warehouseItem` PRIMARY KEY (`warehouseId`,`itemId`),
    CONSTRAINT `fk_warehouseItem_warehouse` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`warehouseId`),
    CONSTRAINT `fk_warehouseItem_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `priceList`(
    `priceListId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_priceList` PRIMARY KEY (`priceListId`)
);

CREATE TABLE `priceListItem`(
    `priceListId` INT NOT NULL,
    `itemId` VARCHAR(40) NOT NULL,
    `price` DECIMAL(16,8) NOT NULL,
    CONSTRAINT `pk_priceListItem` PRIMARY KEY (`priceListId`,`itemId`),
    CONSTRAINT `fk_priceListItem_priceList` FOREIGN KEY (`priceListId`) REFERENCES `priceList` (`priceListId`),
    CONSTRAINT `fk_priceListItem_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `businessPartner`(
    `businessPartnerId` VARCHAR(42) NOT NULL,
    `type` VARCHAR(1) NOT NULL,
    `documentNumber` VARCHAR(40) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `priceListId` INT NOT NULL,
    `active` VARCHAR(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_businessPartner` PRIMARY KEY (`businessPartnerId`),
    CONSTRAINT `fk_businessPartner_priceList` FOREIGN KEY (`priceListId`) REFERENCES `priceList` (`priceListId`)
);

CREATE TABLE `invoice`(
    `documentId` INT NOT NULL,
    `documentType` INT NOT NULL,
    `documentDate` DATETIME NOT NULL,
    `documentUserId` INT NOT NULL,
    `observation` VARCHAR(500) NULL,
    `subTotal` DECIMAL(16,8) NOT NULL,
    `discount` DECIMAL(16,8) NOT NULL,
    `tax` DECIMAL(16,8) NOT NULL,
    `total` DECIMAL(16,8) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_invoice` PRIMARY KEY (`documentId`),
    CONSTRAINT `fk_invoice_priceList` FOREIGN KEY (`priceListId`) REFERENCES `priceList` (`priceListId`),
    CONSTRAINT `fk_invoice_user` FOREIGN KEY (`documentUserId`) REFERENCES `user` (`userId`)
);

CREATE TABLE `invoiceDetail`(
    `documentId` INT NOT NULL,
    `line` INT NOT NULL,
    `itemId` VARCHAR(40) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `tree` VARCHAR(1) NOT NULL,
    `isInventoried` VARCHAR(1) NOT NULL,
    `quantity` INT NOT NULL,
    `price` DECIMAL(16,8) NOT NULL,
    `subTotal` DECIMAL(16,8) NOT NULL,
    `discount` DECIMAL(16,8) NOT NULL,
    `tax` DECIMAL(16,8) NOT NULL,
    `total` DECIMAL(16,8) NOT NULL,
    CONSTRAINT `pk_invoiceDetail` PRIMARY KEY (`documentId`,`line`),
    CONSTRAINT `fk_invoiceDetail_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `kardex`(
    `kardexId` INT NOT NULL AUTO_INCREMENT,
    `documentDate` DATETIME NOT NULL,
    `concept` VARCHAR(500) NOT NULL,
    `warehouseId` VARCHAR(40) NOT NULL,
    `itemId` VARCHAR(40) NOT NULL,
    `quantity` INT NOT NULL,
    `value` DECIMAL(16,8) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_kardex` PRIMARY KEY (`kardexId`),
    CONSTRAINT `fk_kardex_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`)
);

CREATE TABLE `account`(
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    CONSTRAINT `pk_account` PRIMARY KEY (`code`)
);

CREATE TABLE `journalVoucher`(
    `documentId` INT NOT NULL,
    `documentType` INT NOT NULL,
    `documentDate` DATETIME NOT NULL,
    `documentUserId` INT NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_journalVoucher` PRIMARY KEY (`documentId`,`documentType`),
    CONSTRAINT `fk_journalVoucher_user` FOREIGN KEY (`documentUserId`) REFERENCES `user` (`userId`)
);

CREATE TABLE `journalVoucherDetail`(
    `documentId` INT NOT NULL,
    `documentType` INT NOT NULL,
    `line` INT NOT NULL,
    `type` VARCHAR(1) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `value` DECIMAL(16,8) NOT NULL,
    CONSTRAINT `pk_journalVoucherDetail` PRIMARY KEY (`documentId`,`documentType`,`line`),
    CONSTRAINT `fk_journalVoucher_account` FOREIGN KEY (`code`) REFERENCES `account` (`code`)
);











